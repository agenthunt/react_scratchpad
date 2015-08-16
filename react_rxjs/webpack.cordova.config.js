var webpack = require('webpack');
var commonConfig = require('./webpack.common.js');
var ReactStylePlugin = require('react-style-webpack-plugin');
var loaders = [{
  test: /\.js$/,
  loaders: ["babel", require.resolve('react-style-syntax')],
  exclude: [/node_modules/, /dependencies/]
}
];

module.exports = {
  entry: [
    './src/js/config/cordova.js',
    './src/js/bootstrap.js'
  ],
  output: {
    path: __dirname + "/cordova/www",
    publicPath: "",
    filename: "js/bundle.js"
  },
  target: "web",
  module: {
    preLoaders: commonConfig.preLoaders,
    loaders: loaders.concat(commonConfig.loaders)
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ],
  resolve: {
    alias: {
      config: __dirname + '/src/js/config/cordova.js'
    }
  },
  node: commonConfig.node,
  eslint: commonConfig.eslint
}
