const siteForm = document.querySelector('form.j_filter_form');
const hideSiteList = on => document.querySelector('.j_category_wrapper')?.toggleAttribute('hidden', on);

const ui = pageLanguage(location.pathname);
const t = (key, vars) => translate(ui, key, vars);

const panel = document.createElement('section');
panel.id = 'wnf-panel';
panel.innerHTML = `
  <div class="g_hr pt16 pb16 mb12"><h4 class="fw700 lh24 fs20 ls0.15 ell c_m">${t('title')}</h4></div>
  <form>
    <label>${t('minChapters')} <input name="minChapters" type="number" min="0"></label>
    <label>${t('maxChapters')} <input name="maxChapters" type="number" min="0"></label>
    <label>${t('minScore')} <input name="minScore" type="number" min="0" max="5" step="0.1"></label>
    <label>${t('publishedSince')} <input name="publishedAfter" type="date"></label>
    <label><span class="wnf-row">${t('withTags')} <select name="includeMode" aria-label="${t('withTags')}"><option value="all">${t('tagsAll')}</option><option value="any">${t('tagsAny')}</option></select></span><input name="includeTags" list="wnf-include-tags" autocomplete="off" placeholder="magic, isekai"><datalist id="wnf-include-tags"></datalist></label>
    <label>${t('withoutTags')} <input name="excludeTags" list="wnf-exclude-tags" autocomplete="off" placeholder="r18, harem"><datalist id="wnf-exclude-tags"></datalist></label>
    <label>${t('withoutWords')} <input name="excludeWords" placeholder="naruto, pokemon"></label>
    <label>${t('withoutAuthors')} <input name="excludeAuthors" placeholder="author1, author2"></label>
    <label>${t('maxPages')} <input name="maxPages" type="number" min="1" max="50" value="10"></label>
    <button type="submit">${t('search')}</button>
    <button type="button" class="wnf-reset" hidden>${t('showOriginal')}</button>
  </form>
  <ul class="wnf-results clearfix" style="margin: 0 -20px;"></ul>
  <p class="wnf-status" aria-live="polite"></p>
  <button type="button" class="wnf-more" hidden>${t('loadMore')}</button>`;
if (siteForm) siteForm.after(panel);

const form = panel.querySelector('form');
const status = panel.querySelector('.wnf-status');
const results = panel.querySelector('.wnf-results');
const reset = panel.querySelector('.wnf-reset');
const more = panel.querySelector('.wnf-more');
const STORE = 'wnf-filters';

try {
  const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
  for (const [k, v] of Object.entries(saved)) if (form.elements[k]) form.elements[k].value = v;
} catch {}

// Every tag seen while scanning is kept in extension storage to feed the tag autocomplete.
let knownTags = [];
chrome.storage.local.get('tags').then(r => (knownTags = r.tags || []));
for (const input of [form.elements.includeTags, form.elements.excludeTags]) {
  const fill = () => input.list.replaceChildren(...tagSuggestions(input.value, knownTags).slice(0, 50).map(v => new Option(v)));
  input.addEventListener('input', fill);
  input.addEventListener('focus', fill);
}

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
    includeMode: raw.includeMode,
    excludeTags: list('excludeTags'),
    excludeWords: list('excludeWords'),
    excludeAuthors: list('excludeAuthors'),
    maxPages: num('maxPages') || 10,
  };
}

// Results copy the markup of the site's own list items so its CSS styles them.
const ICON_SCORE = '<svg viewBox="0 0 24 24" fill="none" class="mr4 fs16"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" fill="#000"></path></svg>';
const ICON_CHAPTERS = '<svg viewBox="0 0 24 24" fill="none" class="mr4 fs16"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2h10l6 6v14H4V2zm4 4h4v2H8V6zm8 6v-2H8v2h8z" fill="#000"></path></svg>';
const ICON_ADD = '<svg viewBox="0 0 24 24" fill="none" class="fs16"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-11-1H6v2h5v5h2v-5h5v-2h-5V6h-2v5z" fill="#000"></path></svg>';
const lang = location.pathname.match(/^\/[a-z]{2,3}(?=\/)/)?.[0] || '';
const nativeItem = document.querySelector('.j_category_wrapper li');
const nativeAdd = nativeItem?.querySelector('.j_add_to_library');
const labels = { // reuse the page's own (translated) words
  chapters: nativeItem?.querySelector('.ff_number:last-of-type span')?.textContent.replace(/^[\d.,\s]+/, '') || 'Chapters',
  add: nativeAdd?.children[1]?.textContent || 'Add',
  inLibrary: nativeAdd?.children[2]?.textContent || 'In Library',
  addTitle: nativeAdd?.title || 'Add to library',
};
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

function renderBook(b) {
  const href = `${lang}/book/${esc(b.bookId)}`;
  const name = esc(b.bookName);
  const cover = `//book-pic.webnovel.com/bookcover/${esc(b.bookId)}?imageMogr2/thumbnail/150x&amp;imageId=${esc(b.coverUpdateTime)}`;
  const kind = siteForm.elements.categoryType.value === '4' ? 'fanfic' : 'novel';
  const tags = (b.tagInfo || []).map(t => {
    const slug = String(t.enTagName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<a class="fw600 lh16 fs12 ttu ls1 mr12 wsn" href="${lang}/tags/${esc(slug)}-${kind}" title="${esc(t.tagName)} Stories"># ${esc(t.tagName)}</a>`;
  }).join('');
  const score = b.totalScore > 0
    ? `<strong class="c_m fs0 ff_number vam mr16">${ICON_SCORE}<span class="vam fw400 lh16 fs12">${esc(b.totalScore)}</span></strong>`
    : '';
  return `<li class="fl w50% bsbb pl20 pr20 pt8 pb8"><div class="pr" style="height: 120px; padding-left: 106px;">`
    + `<span class="pa l0 t0" style="width: 90px;"><a href="${href}" class="g_thumb _auto" title="${name}"><img cross-origin="anonymous" class="_primary_theme_item" src="${cover}" data-original="${cover}" width="60" height="80" alt="${name}" loading="lazy" style="display: block;"></a></span>`
    + `<p class="mb4 pt4 oh h16 mb8">${tags}</p>`
    + `<h3 class="fw700 lh20 fs16 ls0.15 ell mb4"><a class="c_l" href="${href}" title="${name}">${name}</a></h3>`
    + `<p class="fw400 lh20 fs14 ls0.2 c_l ells _2 mt4">${esc(b.description)}</p>`
    + `<p class="df aic">${score}<strong class="c_m fs0 ff_number vam mr16">${ICON_CHAPTERS}<span class="vam fw400 lh16 fs12">${esc(b.chapterNum)} ${esc(labels.chapters)}</span></strong>`
    + `<a class="bt _s _link fs0 j_add_to_library add_to_library _mini " data-report-uiname="library" data-report-did="${esc(b.bookId)}" data-bookid="${esc(b.bookId)}" data-noveltype="1" href="###" title="${esc(labels.addTitle)}">${ICON_ADD}<span class="vam fw600 lh16 fs12 ttu ls1">${esc(labels.add)}</span><span class="vam fs12 dn _add_library">${esc(labels.inLibrary)}</span></a></p>`
    + `</div></li>`;
}

// Like the site's own list, results load in batches: the next one starts when the "Load more" button scrolls into view.
const BATCH = 20; // matches per batch, one site page's worth
let scan = null; // { params, filters, page, found, done, busy }

function showOriginal() {
  scan = null;
  results.replaceChildren();
  status.textContent = '';
  reset.hidden = true;
  more.hidden = true;
  hideSiteList(false);
}
reset.addEventListener('click', showOriginal);

async function loadMore() {
  const s = scan;
  if (!s || s.busy || s.done) return;
  const token = (document.cookie.match(/_csrfToken=([^;]+)/) || [])[1];
  if (!token) return (status.textContent = t('noToken'));
  s.busy = true;
  more.disabled = true;
  more.textContent = t('searching');
  const seen = new Set();
  let batchFound = 0;
  try {
    for (let i = 0; i < s.filters.maxPages && batchFound < BATCH && !s.done; i++, s.page++) {
      status.textContent = t('progress', { page: s.page, found: s.found });
      s.params.set('_csrfToken', token);
      s.params.set('pageIndex', s.page);
      const res = await fetch(`/go/pcm/category/categoryAjax?${s.params}`, { headers: { 'x-requested-with': 'XMLHttpRequest' } });
      const { code, data } = await res.json();
      if (scan !== s) return; // a new search replaced this one
      if (code !== 0) throw new Error(`code ${code}`);
      for (const b of data.items) for (const t of b.tagInfo || []) seen.add(String(t.tagName).toLowerCase());
      const hits = data.items.filter(b => matches(b, s.filters));
      results.insertAdjacentHTML('beforeend', hits.map(renderBook).join(''));
      batchFound += hits.length;
      s.found += hits.length;
      s.done = Number(data.isLast) === 1;
      await new Promise(r => setTimeout(r, 300)); // ponytail: fixed delay to be polite; tune if the site throttles
    }
    if (scan === s) status.textContent = s.done ? t('done', { found: s.found }) : t('partial', { found: s.found, page: s.page - 1 });
  } catch (err) {
    if (scan === s) status.textContent = t('error', { error: err.message, found: s.found });
  } finally {
    s.busy = false;
    if (scan === s) {
      more.hidden = s.done;
      more.disabled = false;
      more.textContent = t('loadMore');
    }
    knownTags = [...new Set([...knownTags, ...seen])].sort();
    chrome.storage.local.set({ tags: knownTags });
  }
}

new IntersectionObserver(entries => entries[0].isIntersecting && loadMore()).observe(more);
more.addEventListener('click', loadMore);

form.addEventListener('submit', e => {
  e.preventDefault();
  showOriginal();
  hideSiteList(true);
  reset.hidden = false;
  more.hidden = false; // visible from the start so finishing a batch never counts as "scrolled into view"
  scan = { params: new URLSearchParams(new FormData(siteForm)), filters: readFilters(), page: 1, found: 0, done: false, busy: false };
  loadMore();
});
