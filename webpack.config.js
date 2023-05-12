// 引入一个包
import path from "path";
// 引入html插件
import HTMLWebpackPlugin from "html-webpack-plugin";
// 代码混淆插件
import TerserPlugin from "terser-webpack-plugin";
// 复制文件的插件
import CopyPlugin from "copy-webpack-plugin";
// 代替__dirname
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// 配置文件
export default {
    // 指定入口文件
    entry:'./page/index.ts',

    // 指定打包完的目录
    output: {
        // 指定打包后的目录
        path: path.resolve(__dirname, 'page', 'dist'),
        // 打包后的文件的名称
        filename: "bundle.js",
        // 自动清除
        clean: true,

        // 兼容ie
        // environment: {
        //     // 不使用箭头函数
        //     // arrowFunction: false,
        //     // 不使用const
        //     // const: false
        // },

    },
    // 指定打包用的工具模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 使用的loader
                use: [
                    // 配置babel
                    {
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets:{
                                            'chrome' :'88',
                                            // 'ie' : '10'
                                        },
                                        // 指定corejs的版本
                                        "corejs" :"3",
                                        // 使用corejs的方法,按需加载
                                        'useBuiltIns' : "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 排除的文件
                exclude: /node-modules/
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 postcss-loader
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }

                    },
                    "less-loader"
                ]
            },
            // 图片文件的打包
            {
                test:/\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载url-loader file-loader
                loader:'url-loader',
                options: {
                    // 8 * 1024表示 图片大小小于8KB，就会被base64处理
                    // 优点: 减少请求数量(减轻服务器压力)
                    // 缺点: 图片体积会更大(文件请求熟读更慢)
                    limit:  8 * 1024,
                    // 问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
                    // 解析时会出问题:[object Module]
                    // 解决:关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [text]取文件原来扩展名
                    name:'[hash:10].[ext]'
                }
            },
            {
                test: /\.(html)$/,
                use: ['html-withimg-loader']
            }
        ]
    },

    // 配置插件
    plugins: [
        new HTMLWebpackPlugin({
            // 设置模板html
            template: "./page/index.html",
        }),
        new CopyPlugin({
            patterns: [
                { from: './page/img', to: 'img' },
            ],
        }),
    ],

    // 用来设置模块的
    resolve: {
        extensions: ['.js','.ts']
    },

    // 其他配置项
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 是否将注释提取到单独的文件中
                terserOptions: {
                    compress: {
                        drop_console: false, // 去除 console.log
                    },
                    output: {
                        comments: false, // 去除注释
                    },
                },
            }),
        ],
    }
}