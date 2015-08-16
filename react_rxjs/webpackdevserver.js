var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  inline: true,
  hot: true,
  stats: true,
  quiet: false,
  colors: true,
  noInfo: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function(err) {
  if(err) {
    console.log(err);
  }
  console.log('webpack dev server listening on localhost:3000');
});
