'use strict';

const webpack = require('webpack');
const { resolve } = require('path');

const buildPath = resolve(__dirname, 'dist', 'dll');

module.exports = {
  context: __dirname,

  entry: {
    vendors: [resolve('config', 'vendors.js')],
  },

  output: {
    path: buildPath,
    filename: '[name].js',
    library: '[name]__[hash]',
  },

  resolve: {
    modules: ['node_modules'],
  },

  plugins: [
    new webpack.DllPlugin({
      path: resolve(buildPath, 'manifest.json'),
      name: '[name]__[hash]',
    }),

    new webpack.optimize.UglifyJsPlugin(),
  ],
};
