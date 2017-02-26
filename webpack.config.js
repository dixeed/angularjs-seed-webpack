'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const appPath = path.resolve(__dirname, 'app');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return removeEmpty({
    cache: ifProd(),
    context: appPath,
    /** **********************************************
    *                  Entry points                  *
    *************************************************/
    entry: {
      app: './app.js',
    },
    /** **********************************************
     *                  Output                       *
     ************************************************/
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
    },
    /** **********************************************
    *                  Devtool                       *
    *************************************************/
    devServer: ifNotProd({
      contentBase: 'dist',
      inline: true,
    }),
    devtool: ifProd('source-map', 'eval-source-map'),
    /** **********************************************
    *                  Loaders                       *
    *************************************************/
    module: {
      rules: [
        { test: /\.js$/, enforce: 'pre', include: [appPath], use: 'eslint-loader' },

        { test: /\.html$/, include: [appPath], use: 'raw-loader' },
        { test: /\.(scss|sass)$/, include: [appPath], use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.css$/, include: [appPath], use: ['style-loader', 'css-loader'] },
        { test: /\.js$/, include: [appPath], use: ['ng-annotate-loader', 'babel-loader'] },
      ],
    },
    /** **********************************************
    *                  Plugins                       *
    *************************************************/
    plugins: removeEmpty([
      /**
       * used to define global variable which are configured at compile time
       * @see: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env || 'dev'),
        },
      }),

      /**
       * if you want to use interpolation for htmlWebpackPlugin options
       * you have to use a template engine
       * @see: https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
       */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        hash: true,
        inject: 'body',
      }),

      /**
       * Inspired by NG6-starter
       * @see https://github.com/AngularClass/NG6-starter/blob/master/webpack.config.js
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].bundle.js',
        minChunks: module => module.resource && module.resource.indexOf(appPath) === -1,
      }),

      ifProd(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      })),

      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
      })),
    ]),
  });
};
