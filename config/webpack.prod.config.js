'use strict';

const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      /**
       * Mostly generates warnings about vendors code and cannot exclude specific
       * folders for the warnings at the moment.
       * @see http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       */
      compress: {
        warnings: false,
      },
    }),
  ],
};
