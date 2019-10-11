const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const compose = require('next-compose');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = compose([
  withCSS,
  [
    withSass,
    {
      webpack(config) {
        config.node = {
          fs: 'empty',
        };
        const env = Object.keys(process.env).reduce((acc, curr) => {
          acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
          return acc;
        }, {});
        config.plugins.push(new webpack.DefinePlugin(env));

        config.optimization.minimizer = [];
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        return config;
      },
    },
  ],
  withImages,
]);
