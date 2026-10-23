// Whole-name comparison (authors, categories): a partial name must not match someone else.
const hasName = (names, value) => names.some(n => n.trim().toLowerCase() === String(value ?? '').trim().toLowerCase());

function matches(book, f) {
  if (f.minChapters != null && book.chapterNum < f.minChapters) return false;
  if (f.maxChapters != null && book.chapterNum > f.maxChapters) return false;
  if (f.minScore != null && book.totalScore < f.minScore) return false;

  const tags = new Set((book.tagInfo || []).flatMap(t => [t.tagName, t.enTagName]).map(s => String(s).toLowerCase()));
  const has = tag => tags.has(tag.toLowerCase());
  if (f.includeTags?.length && !(f.includeMode === 'any' ? f.includeTags.some(has) : f.includeTags.every(has))) return false;
  if (f.excludeTags && f.excludeTags.some(has)) return false;

  const text = `${book.bookName} ${book.description}`.toLowerCase();
  if (f.excludeWords && f.excludeWords.some(w => text.includes(w.toLowerCase()))) return false;
  if (f.publishedAfter != null && book.publishTime < f.publishedAfter) return false;
  if (f.excludeAuthors && hasName(f.excludeAuthors, book.authorName)) return false;
  if (f.includeCategories?.length && !hasName(f.includeCategories, book.categoryName)) return false;
  if (f.excludeCategories && hasName(f.excludeCategories, book.categoryName)) return false;
  if (f.hideInLibrary && Number(book.inLibrary)) return false;
  return true;
}

// Datalist options for a comma-separated input (tags, authors, categories): complete the last name, keep the earlier ones.
function listSuggestions(value, names) {
  const parts = value.split(',').map(s => s.trim());
  const typed = parts.pop().toLowerCase();
  const prefix = parts.filter(Boolean).map(t => `${t}, `).join('');
  const done = new Set(parts.map(t => t.toLowerCase()));
  return names.filter(n => !done.has(n) && n.includes(typed)).map(n => prefix + n);
}

if (typeof module !== 'undefined') module.exports = { matches, listSuggestions };
