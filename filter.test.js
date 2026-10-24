const test = require('node:test');
const assert = require('node:assert');
const { matches, listSuggestions, mergeRecent } = require('./filter.js');

const book = {
  bookName: 'Genshin Impact : Mas allá del cielo falso',
  authorName: 'Marshal_Madafaka',
  categoryName: 'Videojuegos',
  inLibrary: 0,
  description: 'Un hombre joven atrapado en el juego gacha',
  chapterNum: 124,
  totalScore: 4.5,
  publishTime: Date.UTC(2026, 5, 1),
  tagInfo: [
    { tagName: 'MAGIA', enTagName: 'MAGIC' },
    { tagName: 'R-18', enTagName: 'R18' },
  ],
};

test('empty filters let every book through', () => {
  assert.equal(matches(book, {}), true);
});

test('chapter range is inclusive', () => {
  assert.equal(matches(book, { minChapters: 124, maxChapters: 124 }), true);
  assert.equal(matches(book, { minChapters: 125 }), false);
  assert.equal(matches(book, { maxChapters: 100 }), false);
});

test('minScore rejects lower-rated books', () => {
  assert.equal(matches(book, { minScore: 4.5 }), true);
  assert.equal(matches(book, { minScore: 4.6 }), false);
});

test('includeTags requires every tag, by either language, ignoring case', () => {
  assert.equal(matches(book, { includeTags: ['magia', 'r18'] }), true);
  assert.equal(matches(book, { includeTags: ['magic', 'romance'] }), false);
});

test('excludeTags rejects a book having any of them', () => {
  assert.equal(matches(book, { excludeTags: ['romance'] }), true);
  assert.equal(matches(book, { excludeTags: ['romance', 'R-18'] }), false);
});

test('excludeWords rejects matches in title or description, ignoring case', () => {
  assert.equal(matches(book, { excludeWords: ['naruto'] }), true);
  assert.equal(matches(book, { excludeWords: ['GENSHIN'] }), false);
  assert.equal(matches(book, { excludeWords: ['gacha'] }), false);
});

test('publishedAfter rejects older books', () => {
  assert.equal(matches(book, { publishedAfter: Date.UTC(2026, 0, 1) }), true);
  assert.equal(matches(book, { publishedAfter: Date.UTC(2026, 6, 1) }), false);
});

test('listSuggestions completes only the last comma-separated name, skipping ones already typed', () => {
  const tags = ['magia', 'isekai', 'harén', 'sistema'];
  assert.deepEqual(listSuggestions('', tags), ['magia', 'isekai', 'harén', 'sistema']);
  assert.deepEqual(listSuggestions('magia, is', tags), ['magia, isekai', 'magia, sistema']);
  assert.deepEqual(listSuggestions('magia,', tags), ['magia, isekai', 'magia, harén', 'magia, sistema']);
});

test('includeMode "any" accepts a book having at least one of the tags', () => {
  assert.equal(matches(book, { includeTags: ['magic', 'romance'], includeMode: 'any' }), true);
  assert.equal(matches(book, { includeTags: ['romance', 'harem'], includeMode: 'any' }), false);
  assert.equal(matches(book, { includeTags: ['magic', 'romance'], includeMode: 'all' }), false);
});

test('an empty includeTags list never filters, whatever the mode', () => {
  assert.equal(matches(book, { includeTags: [], includeMode: 'any' }), true);
});

test('excludeAuthors hides books by those exact authors, ignoring case', () => {
  assert.equal(matches(book, { excludeAuthors: ['someone_else'] }), true);
  assert.equal(matches(book, { excludeAuthors: ['someone_else', 'marshal_madafaka'] }), false);
  assert.equal(matches(book, { excludeAuthors: ['marshal'] }), true); // part of a name is not enough
});

test('hideInLibrary hides books already in the library', () => {
  assert.equal(matches(book, { hideInLibrary: true }), true);
  assert.equal(matches({ ...book, inLibrary: 1 }, { hideInLibrary: true }), false);
  assert.equal(matches({ ...book, inLibrary: 1 }, {}), true);
});

test('includeCategories keeps only those categories, excludeCategories hides them, both exact and ignoring case', () => {
  assert.equal(matches(book, { includeCategories: ['anime y cómics', 'videojuegos'] }), true);
  assert.equal(matches(book, { includeCategories: ['tv'] }), false);
  assert.equal(matches(book, { includeCategories: [] }), true);
  assert.equal(matches(book, { excludeCategories: ['VIDEOJUEGOS'] }), false);
  assert.equal(matches(book, { excludeCategories: ['video'] }), true);
});

test('mergeRecent moves seen names to the end and keeps only the newest max', () => {
  assert.deepEqual(mergeRecent(['a', 'b', 'c'], ['b', 'd'], 10), ['a', 'c', 'b', 'd']);
  assert.deepEqual(mergeRecent(['a', 'b', 'c'], ['d', 'e'], 3), ['c', 'd', 'e']);
});

test('keepUnrated lets books without a score through the minScore filter', () => {
  const unrated = { ...book, totalScore: 0 };
  assert.equal(matches(unrated, { minScore: 4 }), false);
  assert.equal(matches(unrated, { minScore: 4, keepUnrated: true }), true);
  assert.equal(matches({ ...book, totalScore: undefined }, { minScore: 4, keepUnrated: true }), true);
  assert.equal(matches({ ...book, totalScore: 3.2 }, { minScore: 4, keepUnrated: true }), false); // rated but too low
});

test('a missing score counts as unrated, so minScore rejects it unless keepUnrated', () => {
  assert.equal(matches({ ...book, totalScore: undefined }, { minScore: 4 }), false);
});
