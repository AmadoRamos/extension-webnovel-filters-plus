// UI strings per webnovel.com language (the URL prefix: /es/, /ja/...; no prefix = English).
const I18N = {
  en: {
    title: 'Filters+', minChapters: 'Min chapters', maxChapters: 'Max chapters', minScore: 'Min score',
    publishedSince: 'Published since', withTags: 'With tags', withoutTags: 'Without tags', withoutWords: 'Without words',
    maxPages: 'Max pages per batch', search: 'Search', showOriginal: 'Show original list', loadMore: 'Load more',
    searching: 'Searching…', noToken: 'Missing the _csrfToken cookie; reload the page.',
    progress: 'Page {page}… {found} found', partial: '{found} found (up to page {page}).',
    done: 'Done: {found} found.', error: 'Error: {error} ({found} found so far)',
  },
  es: {
    title: 'Filtros+', minChapters: 'Capítulos mín.', maxChapters: 'Capítulos máx.', minScore: 'Score mín.',
    publishedSince: 'Publicado desde', withTags: 'Con tags', withoutTags: 'Sin tags', withoutWords: 'Sin palabras',
    maxPages: 'Máx. páginas por tanda', search: 'Buscar', showOriginal: 'Ver lista original', loadMore: 'Cargar más',
    searching: 'Buscando…', noToken: 'Falta la cookie _csrfToken; recarga la página.',
    progress: 'Página {page}… {found} encontradas', partial: '{found} encontradas (hasta la página {page}).',
    done: 'Fin: {found} encontradas.', error: 'Error: {error} ({found} encontradas hasta ahora)',
  },
  pt: {
    title: 'Filtros+', minChapters: 'Capítulos mín.', maxChapters: 'Capítulos máx.', minScore: 'Nota mín.',
    publishedSince: 'Publicado desde', withTags: 'Com tags', withoutTags: 'Sem tags', withoutWords: 'Sem palavras',
    maxPages: 'Máx. páginas por lote', search: 'Buscar', showOriginal: 'Ver lista original', loadMore: 'Carregar mais',
    searching: 'Buscando…', noToken: 'Falta o cookie _csrfToken; recarregue a página.',
    progress: 'Página {page}… {found} encontrados', partial: '{found} encontrados (até a página {page}).',
    done: 'Fim: {found} encontrados.', error: 'Erro: {error} ({found} encontrados até agora)',
  },
  fr: {
    title: 'Filtres+', minChapters: 'Chapitres min.', maxChapters: 'Chapitres max.', minScore: 'Note min.',
    publishedSince: 'Publié depuis', withTags: 'Avec tags', withoutTags: 'Sans tags', withoutWords: 'Sans mots',
    maxPages: 'Pages max. par lot', search: 'Rechercher', showOriginal: 'Voir la liste d\'origine', loadMore: 'Charger plus',
    searching: 'Recherche…', noToken: 'Cookie _csrfToken manquant ; rechargez la page.',
    progress: 'Page {page}… {found} trouvés', partial: '{found} trouvés (jusqu\'à la page {page}).',
    done: 'Terminé : {found} trouvés.', error: 'Erreur : {error} ({found} trouvés jusqu\'ici)',
  },
  de: {
    title: 'Filter+', minChapters: 'Min. Kapitel', maxChapters: 'Max. Kapitel', minScore: 'Min. Bewertung',
    publishedSince: 'Veröffentlicht seit', withTags: 'Mit Tags', withoutTags: 'Ohne Tags', withoutWords: 'Ohne Wörter',
    maxPages: 'Max. Seiten pro Durchgang', search: 'Suchen', showOriginal: 'Originalliste anzeigen', loadMore: 'Mehr laden',
    searching: 'Suche…', noToken: 'Cookie _csrfToken fehlt; Seite neu laden.',
    progress: 'Seite {page}… {found} gefunden', partial: '{found} gefunden (bis Seite {page}).',
    done: 'Fertig: {found} gefunden.', error: 'Fehler: {error} ({found} bisher gefunden)',
  },
  id: {
    title: 'Filter+', minChapters: 'Bab min.', maxChapters: 'Bab maks.', minScore: 'Skor min.',
    publishedSince: 'Terbit sejak', withTags: 'Dengan tag', withoutTags: 'Tanpa tag', withoutWords: 'Tanpa kata',
    maxPages: 'Maks. halaman per kelompok', search: 'Cari', showOriginal: 'Lihat daftar asli', loadMore: 'Muat lebih banyak',
    searching: 'Mencari…', noToken: 'Cookie _csrfToken tidak ada; muat ulang halaman.',
    progress: 'Halaman {page}… {found} ditemukan', partial: '{found} ditemukan (sampai halaman {page}).',
    done: 'Selesai: {found} ditemukan.', error: 'Kesalahan: {error} ({found} ditemukan sejauh ini)',
  },
  ms: {
    title: 'Penapis+', minChapters: 'Bab min.', maxChapters: 'Bab maks.', minScore: 'Skor min.',
    publishedSince: 'Diterbitkan sejak', withTags: 'Dengan tag', withoutTags: 'Tanpa tag', withoutWords: 'Tanpa perkataan',
    maxPages: 'Maks. halaman setiap kumpulan', search: 'Cari', showOriginal: 'Lihat senarai asal', loadMore: 'Muat lagi',
    searching: 'Mencari…', noToken: 'Kuki _csrfToken tiada; muat semula halaman.',
    progress: 'Halaman {page}… {found} dijumpai', partial: '{found} dijumpai (sehingga halaman {page}).',
    done: 'Selesai: {found} dijumpai.', error: 'Ralat: {error} ({found} dijumpai setakat ini)',
  },
  it: {
    title: 'Filtri+', minChapters: 'Capitoli min.', maxChapters: 'Capitoli max.', minScore: 'Voto min.',
    publishedSince: 'Pubblicato dal', withTags: 'Con tag', withoutTags: 'Senza tag', withoutWords: 'Senza parole',
    maxPages: 'Max pagine per blocco', search: 'Cerca', showOriginal: 'Mostra elenco originale', loadMore: 'Carica altri',
    searching: 'Ricerca…', noToken: 'Manca il cookie _csrfToken; ricarica la pagina.',
    progress: 'Pagina {page}… {found} trovati', partial: '{found} trovati (fino alla pagina {page}).',
    done: 'Fine: {found} trovati.', error: 'Errore: {error} ({found} trovati finora)',
  },
  ja: {
    title: 'フィルター+', minChapters: '最小話数', maxChapters: '最大話数', minScore: '最低評価',
    publishedSince: '公開日以降', withTags: '含むタグ', withoutTags: '除外タグ', withoutWords: '除外ワード',
    maxPages: '1回あたりの最大ページ数', search: '検索', showOriginal: '元のリストを表示', loadMore: 'さらに読み込む',
    searching: '検索中…', noToken: '_csrfToken クッキーがありません。ページを再読み込みしてください。',
    progress: '{page} ページ目… {found} 件', partial: '{found} 件（{page} ページまで）',
    done: '完了：{found} 件', error: 'エラー：{error}（ここまで {found} 件）',
  },
  ko: {
    title: '필터+', minChapters: '최소 회차', maxChapters: '최대 회차', minScore: '최소 평점',
    publishedSince: '게시일 이후', withTags: '포함 태그', withoutTags: '제외 태그', withoutWords: '제외 단어',
    maxPages: '회당 최대 페이지', search: '검색', showOriginal: '원래 목록 보기', loadMore: '더 보기',
    searching: '검색 중…', noToken: '_csrfToken 쿠키가 없습니다. 페이지를 새로고침하세요.',
    progress: '{page}페이지… {found}개 찾음', partial: '{found}개 찾음 ({page}페이지까지).',
    done: '완료: {found}개 찾음.', error: '오류: {error} (지금까지 {found}개 찾음)',
  },
  ru: {
    title: 'Фильтры+', minChapters: 'Мин. глав', maxChapters: 'Макс. глав', minScore: 'Мин. оценка',
    publishedSince: 'Опубликовано с', withTags: 'С тегами', withoutTags: 'Без тегов', withoutWords: 'Без слов',
    maxPages: 'Макс. страниц за раз', search: 'Искать', showOriginal: 'Показать исходный список', loadMore: 'Загрузить ещё',
    searching: 'Поиск…', noToken: 'Нет cookie _csrfToken; перезагрузите страницу.',
    progress: 'Страница {page}… найдено: {found}', partial: 'Найдено: {found} (до страницы {page}).',
    done: 'Готово: найдено {found}.', error: 'Ошибка: {error} (пока найдено: {found})',
  },
  th: {
    title: 'ตัวกรอง+', minChapters: 'ตอนขั้นต่ำ', maxChapters: 'ตอนสูงสุด', minScore: 'คะแนนขั้นต่ำ',
    publishedSince: 'เผยแพร่ตั้งแต่', withTags: 'มีแท็ก', withoutTags: 'ไม่มีแท็ก', withoutWords: 'ไม่มีคำ',
    maxPages: 'หน้าสูงสุดต่อรอบ', search: 'ค้นหา', showOriginal: 'แสดงรายการเดิม', loadMore: 'โหลดเพิ่ม',
    searching: 'กำลังค้นหา…', noToken: 'ไม่พบคุกกี้ _csrfToken โปรดโหลดหน้าใหม่',
    progress: 'หน้า {page}… พบ {found} เรื่อง', partial: 'พบ {found} เรื่อง (ถึงหน้า {page})',
    done: 'เสร็จสิ้น: พบ {found} เรื่อง', error: 'ข้อผิดพลาด: {error} (พบแล้ว {found} เรื่อง)',
  },
  tr: {
    title: 'Filtreler+', minChapters: 'Min. bölüm', maxChapters: 'Maks. bölüm', minScore: 'Min. puan',
    publishedSince: 'Yayın tarihi (itibaren)', withTags: 'Bu etiketlerle', withoutTags: 'Bu etiketler olmadan', withoutWords: 'Bu kelimeler olmadan',
    maxPages: 'Tur başına maks. sayfa', search: 'Ara', showOriginal: 'Orijinal listeyi göster', loadMore: 'Daha fazla yükle',
    searching: 'Aranıyor…', noToken: '_csrfToken çerezi yok; sayfayı yenileyin.',
    progress: 'Sayfa {page}… {found} bulundu', partial: '{found} bulundu ({page}. sayfaya kadar).',
    done: 'Bitti: {found} bulundu.', error: 'Hata: {error} (şu ana kadar {found} bulundu)',
  },
  vi: {
    title: 'Bộ lọc+', minChapters: 'Số chương tối thiểu', maxChapters: 'Số chương tối đa', minScore: 'Điểm tối thiểu',
    publishedSince: 'Đăng từ ngày', withTags: 'Có thẻ', withoutTags: 'Không có thẻ', withoutWords: 'Không có từ',
    maxPages: 'Số trang tối đa mỗi lượt', search: 'Tìm kiếm', showOriginal: 'Xem danh sách gốc', loadMore: 'Tải thêm',
    searching: 'Đang tìm…', noToken: 'Thiếu cookie _csrfToken; hãy tải lại trang.',
    progress: 'Trang {page}… tìm thấy {found}', partial: 'Tìm thấy {found} (đến trang {page}).',
    done: 'Xong: tìm thấy {found}.', error: 'Lỗi: {error} (đã tìm thấy {found})',
  },
  zh: {
    title: '篩選+', minChapters: '最少章節', maxChapters: '最多章節', minScore: '最低評分',
    publishedSince: '發布日期起', withTags: '包含標籤', withoutTags: '排除標籤', withoutWords: '排除關鍵字',
    maxPages: '每批最多頁數', search: '搜尋', showOriginal: '顯示原始列表', loadMore: '載入更多',
    searching: '搜尋中…', noToken: '缺少 _csrfToken cookie，請重新整理頁面。',
    progress: '第 {page} 頁… 已找到 {found} 本', partial: '已找到 {found} 本（至第 {page} 頁）。',
    done: '完成：共找到 {found} 本。', error: '錯誤：{error}（目前已找到 {found} 本）',
  },
  fil: {
    title: 'Mga Filter+', minChapters: 'Min. na kabanata', maxChapters: 'Max. na kabanata', minScore: 'Min. na score',
    publishedSince: 'Inilathala mula', withTags: 'May tag', withoutTags: 'Walang tag', withoutWords: 'Walang salita',
    maxPages: 'Max. na pahina bawat batch', search: 'Maghanap', showOriginal: 'Ipakita ang orihinal na listahan', loadMore: 'Mag-load pa',
    searching: 'Naghahanap…', noToken: 'Walang _csrfToken cookie; i-reload ang pahina.',
    progress: 'Pahina {page}… {found} ang nahanap', partial: '{found} ang nahanap (hanggang pahina {page}).',
    done: 'Tapos na: {found} ang nahanap.', error: 'Error: {error} ({found} ang nahanap sa ngayon)',
  },
};

function pageLanguage(pathname) {
  const prefix = pathname.match(/^\/([a-z]{2,3})\//)?.[1];
  return prefix in I18N ? prefix : 'en';
}

function translate(lang, key, vars = {}) {
  return (I18N[lang] || I18N.en)[key].replace(/\{(\w+)\}/g, (_, k) => vars[k]);
}

if (typeof module !== 'undefined') module.exports = { I18N, pageLanguage, translate };
