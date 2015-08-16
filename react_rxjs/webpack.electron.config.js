var webpack = require('webpack');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var loaders = [{
  test: /\.js$/,
  loaders: ["babel", require.resolve('react-style-syntax')],
  exclude: [/node_modules/, /dependencies/]
}];

module.exports = {
  entry: [
    './src/js/config/electron.js',
    './src/js/bootstrap.js',
    './src/index.html',
  ],
  output: {
    path: __dirname + "/electron/assets",
    publicPath: "",
    filename: "js/bundle.js"
  },
  target: "atom",
  module: {
    preLoaders: commonConfig.preLoaders,
    loaders: loaders.concat(commonConfig.loaders)
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  resolve: {
    alias: {
      config: __dirname + '/src/js/config/electron.js'
    }
  },
  node: commonConfig.node,
  eslint: commonConfig.eslint
}
