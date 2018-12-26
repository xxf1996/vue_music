const path = require('path')
const uglifyjs = require('uglifyjs-webpack-plugin') // 压缩js的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态在html中插入生成的js路径
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 配合vue-loader的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空之前打包的文件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 直接复制静态资源到打包目录中

module.exports = {
    entry: __dirname + '/src/index.js', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 出口文件路径，必须是已存在的路径，否则dev不能查看到页面
        filename: '[name].[hash:8].js', // 每次输出加上不同的hash值
        chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称
    },
    plugins: [ // 插件列表
        //new uglifyjs(),
        new CleanWebpackPlugin(['dist']), // 设置要清空的目录
        /*
        new CopyWebpackPlugin([
            {
                from: 'static', // 按规则将静态文件拷贝到打包目录中
                to: './' // 相对于出口路径而言？
            }
        ]),
        */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack test',
            template: 'static/index.html' // 按照给定的html模板进行输出，一般插入js路径和标题
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [ // loader配置
            {
                test: /\.vue$/, // resource.test
                include: [
                    path.resolve(__dirname, 'src')
                ], // resource.include
                loader: [
                    'vue-loader' // 依赖vue-template-compiler
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', // vue-style-loader与之的区别？
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // 压缩css文件（只对单独分离出来的.css文件才有用？）
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // 压缩css文件（只对单独分离出来的.css文件才有用？）
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader', // 引入公共的scss文件，以便在每个vue文件中都能使用
                        options: {
                          // 引入多个文件时用数组的形式传入，单个文件时可以直接使用如下形式
                          resources: path.resolve(__dirname, 'src/style/common.scss')  
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader', // vue-style-loader与之的区别？
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // 压缩css文件（只对单独分离出来的.css文件才有用？）
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {
                        loader: 'babel-loader', // 依赖@babel/core @babel/preset-env包：https://www.cnblogs.com/soyxiaobi/p/9554565.html
                        options: { //如果有这个设置则不用再添加.babelrc文件进行配置
                            babelrc: false,// 不采用.babelrc的配置
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import", // 使用babel需要这个插件，还需需要安装dynamic-import-webpack这个包
                                ["import", {
                                    "libraryName": "muse-ui",
                                    "libraryDirectory": "lib",
                                    "camel2DashComponentName": false
                                }] // 按需加载muse-ui的组件（需要依赖babel-plugin-import, less, less-loader）
                            ] 
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/img' // 文件打包（build）时的输出路径，相对于项目输出路径而言
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: { // 将一些模块单独分离出来成js文件
            cacheGroups: {
                vendor: {
                    test: /vue|axios/, // 直接使用 test 来做路径匹配
                    chunks: "initial",
                    name: "vendor",
                    enforce: true,
                },
            },
        },
    },
    resolve: { // 模块解析设置
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css', '.vue'] // 解析引入模块文件时，自动匹配的文件后缀列表
    },
    devServer: { // webpack-dev-server配置
        publicPath: '/',
        // host: '192.168.0.108' // 本机ip，方便局域网内访问调试
    }
}