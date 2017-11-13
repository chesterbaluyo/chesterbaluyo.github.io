const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    output: {
        filename: 'dist/app.bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, '')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './main.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            },
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '')
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        compress: true
    }
};