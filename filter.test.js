const test = require('node:test');
const assert = require('node:assert');
const { matches } = require('./filter.js');

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
