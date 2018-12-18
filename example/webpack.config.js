const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");  
const webpack = require('webpack'); // 新增
module.exports = {
    entry: {
        app: "./example/app.js"
    },
    output: {
        publicPath: '',
        path: __dirname + "/dev",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
			    use: [
						 {
							loader: "url-loader",
							options: {
								limit:50000,   //小于50K的 都打包
								name:"[hash:8].[name].[ext]",
								publicPath:"img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
								outputPath:"../img/"		//生成之后存放的路径
							}
						 }
				]
            }
            
        ]
    },
    // devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: "./example/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(), // 新增
        new webpack.HotModuleReplacementPlugin() //新增
    ],
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 8033,
        host: "127.0.0.1",
        hot: true // 新增
    }
};