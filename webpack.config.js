'use strict';

var path = require('path');
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
