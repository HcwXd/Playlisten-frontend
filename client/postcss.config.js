const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./components/**/*.js', './containers/**/*.js', './hoc/**/*.js'],

  // Please include prefix of CSS classes that are not used in our .js files (ex. class to overwrite Draft CSS)
  // whitelistPatternsChildren: [
  // ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss'), // eslint-disable-line global-require
    require('autoprefixer'), // eslint-disable-line global-require
    ...(process.env.NODE_ENV === 'development' ? [] : [purgecss]),
  ],
};
