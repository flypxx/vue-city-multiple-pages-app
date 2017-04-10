var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var glob = require('glob')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

const conf = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
}

glob.sync('./src/pages/**/*.html').forEach(filepath => {
  console.log(filepath)
  const filename = filepath.split('./src/pages/')[1].split('/app.html')[0] + '.html'
  const chunk = filepath.split('./src/pages/')[1].split('.html')[0]
  const htmlConf = {
    filename: filename,
    template: filepath,
    inject: 'body',
    // favicon: './src/assets/img/logo.png',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  conf.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = merge(baseWebpackConfig, conf)
