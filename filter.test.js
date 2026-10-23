const test = require('node:test');
const assert = require('node:assert');
const { matches, tagSuggestions } = require('./filter.js');

const book = {
  bookName: 'Genshin Impact : Mas allá del cielo falso',
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

test('tagSuggestions completes only the last comma-separated tag, skipping ones already typed', () => {
  const tags = ['magia', 'isekai', 'harén', 'sistema'];
  assert.deepEqual(tagSuggestions('', tags), ['magia', 'isekai', 'harén', 'sistema']);
  assert.deepEqual(tagSuggestions('magia, is', tags), ['magia, isekai', 'magia, sistema']);
  assert.deepEqual(tagSuggestions('magia,', tags), ['magia, isekai', 'magia, harén', 'magia, sistema']);
});

test('includeMode "any" accepts a book having at least one of the tags', () => {
  assert.equal(matches(book, { includeTags: ['magic', 'romance'], includeMode: 'any' }), true);
  assert.equal(matches(book, { includeTags: ['romance', 'harem'], includeMode: 'any' }), false);
  assert.equal(matches(book, { includeTags: ['magic', 'romance'], includeMode: 'all' }), false);
});

test('an empty includeTags list never filters, whatever the mode', () => {
  assert.equal(matches(book, { includeTags: [], includeMode: 'any' }), true);
});
