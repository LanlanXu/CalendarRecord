const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

function resolve(dir) {
  return path.join(__dirname, dir)  // 将参数以/分隔连接
}
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    disableHostCheck: true,
    hot: true,
    open: 'Chrome',
    port: 3333
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});