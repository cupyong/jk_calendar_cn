const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
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
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 50000,   //小于50K的 都打包
                            name: "[hash:8].[name].[ext]",
                            publicPath: "img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            outputPath: "../img/"		//生成之后存放的路径
                        }
                    }
                ]
            }

        ]
    },
    externals: [nodeExternals()]
};
