const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const compose = require('next-compose');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = compose([
  withCSS,
  [
    withSass,
    {
      webpack(config) {
        config.optimization.minimizer = [];
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        return config;
      },
    },
  ],
  withImages,
]);
