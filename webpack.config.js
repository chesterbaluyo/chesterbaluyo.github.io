const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main.html',
            filename: '../index.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    }
};