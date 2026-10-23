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
  return true;
}

// Datalist options for a comma-separated tag input: complete the last tag, keep the earlier ones.
function tagSuggestions(value, tags) {
  const parts = value.split(',').map(s => s.trim());
  const typed = parts.pop().toLowerCase();
  const prefix = parts.filter(Boolean).map(t => `${t}, `).join('');
  const done = new Set(parts.map(t => t.toLowerCase()));
  return tags.filter(t => !done.has(t) && t.includes(typed)).map(t => prefix + t);
}

if (typeof module !== 'undefined') module.exports = { matches, tagSuggestions };
