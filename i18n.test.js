const test = require('node:test');
const assert = require('node:assert');
const { I18N, pageLanguage, translate } = require('./i18n.js');

test('pageLanguage reads the URL prefix and falls back to English', () => {
  assert.equal(pageLanguage('/es/stories/fanfic'), 'es');
  assert.equal(pageLanguage('/fil/stories/fanfic'), 'fil');
  assert.equal(pageLanguage('/stories/fanfic'), 'en');
  assert.equal(pageLanguage('/ar/stories/fanfic'), 'en'); // the site itself shows English there
});

test('translate fills placeholders in the chosen language', () => {
  assert.equal(translate('es', 'done', { found: 3 }), 'Fin: 3 encontradas.');
  assert.equal(translate('en', 'search'), 'Search');
});

test('every language has every English key', () => {
  for (const [lang, strings] of Object.entries(I18N)) {
    assert.deepEqual(Object.keys(strings).sort(), Object.keys(I18N.en).sort(), lang);
  }
});
