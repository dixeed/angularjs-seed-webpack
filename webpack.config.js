'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const appPath = resolve(__dirname, 'app');
const buildPath = resolve(__dirname, 'dist');

module.exports = (env) => {
  const { ifProd, ifDev, ifAnalyze } = getIfUtils(env, ['prod', 'dev', 'analyze']);

  return removeEmpty({
    cache: ifProd(),
    context: appPath,

    ////////////////////////////////////////////////
    //                  Entry points              //
    ////////////////////////////////////////////////
    entry: {
      app: './app.js',
    },
    //////////////////////////////////////////////////
    //                 Output                       //
    //////////////////////////////////////////////////
    output: {
      path: buildPath,
      filename: ifProd('[name].[chunkhash].js', '[name].js'),
    },
    ////////////////////////////////////////////////////
    //                 Devtool                        //
    ////////////////////////////////////////////////////
    devServer: ifDev({
      contentBase: 'dist',
      inline: true,
      open: true,
    }),
    devtool: ifProd('source-map', 'eval-source-map'),
    //////////////////////////////////////////////////////
    //                 Loaders                          //
    //////////////////////////////////////////////////////
    module: {
      rules: [
        { test: /\.js$/, enforce: 'pre', include: [appPath], use: 'eslint-loader' },

        { test: /\.html$/, include: [appPath], use: 'raw-loader' },
        {
          test: /\.(scss|sass)$/,
          include: [appPath],
          use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
        },
        { test: /\.css$/, include: [appPath], use: ['style-loader', 'css-loader'] },
        {
          test: /\.js$/,
          include: [appPath],
          use: [
            'ng-annotate-loader',
            { loader: 'babel-loader', options: { cacheDirectory: true } },
          ],
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        },
        {
          test: /\.(jpg|png)$/,
          include: [appPath],
          use: {
            loader: 'file-loader',
            options: { name: './images/[hash].[ext]' },
          },
        },
      ],
    },
    /////////////////////////////////////////////////////////////
    //                       Plugins                           //
    /////////////////////////////////////////////////////////////
    plugins: removeEmpty([

      ifProd(new CleanWebpackPlugin(['dist'], { root: __dirname, verbose: true })),

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

      //////////////////////////////////////////////////////////
      //                     DLL                              //
      //////////////////////////////////////////////////////////
      ifDev(new webpack.DllReferencePlugin({
        context: '.',
        manifest: resolve(buildPath, 'dll', 'manifest.json'),
      })),

      ifDev(new AddAssetHtmlPlugin({
        filepath: resolve(buildPath, 'dll', 'vendors.js'),
        includeSourcemap: false,
      })),


      //////////////////////////////////////////////////////////
      //                     Chunks                           //
      //////////////////////////////////////////////////////////
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => module.resource && module.resource.indexOf(appPath) === -1,
      })),

      ifProd(new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })),

      ifProd(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      })),

      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
      })),

      ifAnalyze(new BundleAnalyzerPlugin({ analyzerMode: 'static' })),
    ]),
  });
};
