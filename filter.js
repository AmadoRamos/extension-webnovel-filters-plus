function matches(book, f) {
  if (f.minChapters != null && book.chapterNum < f.minChapters) return false;
  if (f.maxChapters != null && book.chapterNum > f.maxChapters) return false;
  if (f.minScore != null && book.totalScore < f.minScore) return false;

  const tags = new Set((book.tagInfo || []).flatMap(t => [t.tagName, t.enTagName]).map(s => String(s).toLowerCase()));
  const has = tag => tags.has(tag.toLowerCase());
  if (f.includeTags && !f.includeTags.every(has)) return false;
  if (f.excludeTags && f.excludeTags.some(has)) return false;

  const text = `${book.bookName} ${book.description}`.toLowerCase();
  if (f.excludeWords && f.excludeWords.some(w => text.includes(w.toLowerCase()))) return false;
  if (f.publishedAfter != null && book.publishTime < f.publishedAfter) return false;
  return true;
}

if (typeof module !== 'undefined') module.exports = { matches };
