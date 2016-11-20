'use strict';

var path = require('path');

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
  }
};
