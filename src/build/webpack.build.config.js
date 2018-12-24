const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

function resolve(dir) {
    return path.join(__dirname, dir)  // 将参数以/分隔连接
}
module.exports = merge(baseConfig, {
    output: {
        path: resolve('../../webapp'),
        filename: 'js/bundle.[hash].js',
        publicPath: ''
    },
    externals: {
        // 'vue': 'Vue'  // 引入插件，外链
    },
    plugins: [
        new CleanWebpackPlugin(
            ['../../webapp/js'],
            {
                watch: true, // 一旦重新编译时，都会重新删除一次文件
                exclude: ['static'], // 排除需要删除的文件（有些文件不需要删除）
                allowExternal: true
            }
        )
    ]
});