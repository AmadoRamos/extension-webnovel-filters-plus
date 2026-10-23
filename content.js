const siteForm = document.querySelector('form.j_filter_form');
const hideSiteList = on => document.querySelector('.j_category_wrapper')?.toggleAttribute('hidden', on);

const panel = document.createElement('section');
panel.id = 'wnf-panel';
panel.innerHTML = `
  <div class="g_hr pt16 pb16 mb12"><h4 class="fw700 lh24 fs20 ls0.15 ell c_m">Filtros+</h4></div>
  <form>
    <label>Capítulos mín <input name="minChapters" type="number" min="0"></label>
    <label>Capítulos máx <input name="maxChapters" type="number" min="0"></label>
    <label>Score mín <input name="minScore" type="number" min="0" max="5" step="0.1"></label>
    <label>Publicado desde <input name="publishedAfter" type="date"></label>
    <label>Con tags <input name="includeTags" placeholder="magic, isekai"></label>
    <label>Sin tags <input name="excludeTags" placeholder="r18, harem"></label>
    <label>Sin palabras <input name="excludeWords" placeholder="naruto, pokemon"></label>
    <label>Páginas a escanear <input name="maxPages" type="number" min="1" max="50" value="10"></label>
    <button type="submit">Buscar</button>
    <button type="button" class="wnf-reset" hidden>Ver lista original</button>
  </form>
  <p class="wnf-status" aria-live="polite"></p>
  <ol class="wnf-results"></ol>`;
if (siteForm) siteForm.after(panel);

const form = panel.querySelector('form');
const status = panel.querySelector('.wnf-status');
const results = panel.querySelector('.wnf-results');
const reset = panel.querySelector('.wnf-reset');
const STORE = 'wnf-filters';

try {
  const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
  for (const [k, v] of Object.entries(saved)) if (form.elements[k]) form.elements[k].value = v;
} catch {}

function readFilters() {
  const raw = Object.fromEntries(new FormData(form));
  try { localStorage.setItem(STORE, JSON.stringify(raw)); } catch {}
  const num = k => (raw[k] === '' ? null : Number(raw[k]));
  const list = k => raw[k].split(',').map(s => s.trim()).filter(Boolean);
  return {
    minChapters: num('minChapters'),
    maxChapters: num('maxChapters'),
    minScore: num('minScore'),
    publishedAfter: raw.publishedAfter ? new Date(`${raw.publishedAfter}T00:00`).getTime() : null, // local midnight
    includeTags: list('includeTags'),
    excludeTags: list('excludeTags'),
    excludeWords: list('excludeWords'),
    maxPages: num('maxPages') || 10,
  };
}

function renderBook(b) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = `//book-pic.webnovel.com/bookcover/${b.bookId}?imageMogr2/thumbnail/150x&imageId=${b.coverUpdateTime}`;
  img.loading = 'lazy';
  img.alt = '';
  const a = document.createElement('a');
  a.href = `/book/${b.bookId}`;
  a.textContent = b.bookName;
  const meta = document.createElement('small');
  meta.textContent = `${b.chapterNum} caps · ★${b.totalScore} · ${new Date(b.publishTime).toLocaleDateString()} · ${(b.tagInfo || []).map(t => t.tagName).join(', ')}`;
  li.append(img, a, meta);
  return li;
}

function showOriginal() {
  results.replaceChildren();
  status.textContent = '';
  reset.hidden = true;
  hideSiteList(false);
}
reset.addEventListener('click', showOriginal);

form.addEventListener('submit', async e => {
  e.preventDefault();
  const token = (document.cookie.match(/_csrfToken=([^;]+)/) || [])[1];
  if (!token) return (status.textContent = 'Falta la cookie _csrfToken; recarga la página.');
  const filters = readFilters();
  const button = form.querySelector('[type=submit]');
  button.disabled = true;
  showOriginal();
  hideSiteList(true);
  reset.hidden = false;
  let found = 0;
  try {
    for (let page = 1; page <= filters.maxPages; page++) {
      status.textContent = `Página ${page}/${filters.maxPages}… ${found} encontradas`;
      const params = new URLSearchParams(new FormData(siteForm));
      params.set('_csrfToken', token);
      params.set('pageIndex', page);
      const res = await fetch(`/go/pcm/category/categoryAjax?${params}`, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
      const { code, data } = await res.json();
      if (code !== 0) throw new Error(`code ${code}`);
      for (const b of data.items.filter(b => matches(b, filters))) results.append(renderBook(b)), found++;
      if (Number(data.isLast) === 1) break;
      await new Promise(r => setTimeout(r, 300)); // ponytail: fixed delay to be polite; tune if the site throttles
    }
    status.textContent = `Listo: ${found} encontradas.`;
  } catch (err) {
    status.textContent = `Error: ${err.message} (${found} encontradas hasta ahora)`;
  } finally {
    button.disabled = false;
  }
});
