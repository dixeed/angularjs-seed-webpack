'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './app/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, include: [ path.resolve(__dirname, 'app') ], loader: 'raw' }
    ]
  },
  plugins: [
    // used to define global variable which are configured at compile time
    // @see: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
      }
    }),
    // if you want to use interpolation for htmlWebpackPlugin options you have to use a template engine
    // @see: https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      hash: true,
      inject: 'body'
    })
  ]
};
