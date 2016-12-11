'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const dev = require('./config/webpack.dev.config');
const prod = require('./config/webpack.prod.config');

const TARGET = process.env.npm_lifecycle_event;
const appPath = path.resolve(__dirname, 'app');

const common = {
  context: __dirname,
  entry: './app/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      { test: /\.js$/, include: [appPath], loader: 'eslint-loader' },
    ],
    loaders: [
      { test: /\.html$/, include: [appPath], loader: 'raw' },
      { test: /\.(scss|sass)$/, include: [appPath], loader: 'style!css!sass' },
      { test: /\.css$/, include: [appPath], loader: 'style!css' },
      { test: /\.js$/, include: [appPath], loader: 'ng-annotate!babel' },
      { test: /\.json$/, include: [appPath], loader: 'json-loader' },
    ],
  },
  plugins: [
    /**
     * used to define global variable which are configured at compile time
     * @see: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
      },
    }),

    /**
     * if you want to use interpolation for htmlWebpackPlugin options
     * you have to use a template engine
     * @see: https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
     */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      hash: true,
      inject: 'body',
    }),
  ],
};

switch (TARGET) {
  case 'start':
    module.exports = merge.smart(common, dev);
    break;

  case 'build':
    module.exports = merge.smart(common, prod);
    break;

  default:
}
