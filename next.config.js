const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const compose = require('next-compose');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

require('dotenv').config(
  process.env.ENV === 'development'
    ? { path: `${process.cwd()}/.env.dev` }
    : null,
);

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
  withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
    },
  }),
]);
