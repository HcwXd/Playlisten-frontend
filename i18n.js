const NextI18Next = require('next-i18next').default;

const detector = {
  // order and from where user language should be detected
  order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],

  caches: ['localStorage'],
  // keys or params to lookup language from
  lookupLocalStorage: 'i18nextLng',
  lookupQuerystring: 'lang',
};

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['zh'],
  detection: detector,
  lng: 'en',
  defaultNS: 'common',
});
