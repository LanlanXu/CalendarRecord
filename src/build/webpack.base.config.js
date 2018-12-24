const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, dir)  // 将参数以/分隔连接
}
module.exports = {
    entry: resolve('../main.js'), // 入口文件，main.js开始，把所有相关文件抓取，编译，输出到bundle.js中
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 默认扩展名
        alias: {
            '@': resolve('../'),  // 设置路径别名
            'vue$': 'vue/dist/vue.esm.js'  // 不设置页面就会空白
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: /src/,
                query: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            {
                test: /\.vue$/,
                include: /src/,
                loader: 'vue-loader'  // 将vue文件用vue-loader编译
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'] // 将css文件用loader编译
                // css-loader将css文件编译成commonjs，style-loader使用style标签，将css-loader编译的js字符串注入到html页面中
            },
            {
                test: /\.scss$/,
                include: /src/,
                loader: ['style-loader', 'css-loader', 'sass-loader'] // 将css文件用loader编译
                // sass-loader将sass编译成css文件，css-loader将css文件编译成commonjs，style-loader使用style标签，将css-loader编译的js字符串注入到html页面中
            },
            {test:/\.(png|woff|woff2|svg|ttf|eot)$/,
            use:{
                    loader:'url-loader',
                    options: {
                        limit: 100000,  //这里要足够大这样所有的字体图标都会打包到css中
                    }
            }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                include: /src/,
                loader: 'url-loader', // 低于4000B的图片会被编译成base64位，减少请求，高于的文件还是用file-loader链接的形式引入
                options: {
                    limit: 4000, // 大小低于4000B的base64位引入
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      })
    ]
};