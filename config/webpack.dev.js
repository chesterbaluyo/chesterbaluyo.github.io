const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const commonConfig = require('./webpack.common');
const path = require('path');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    output: {
        filename: 'dist/[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new ExtractTextPlugin('dist/[name].bundle.css'),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, 'dist')
        }),
        new HtmlWebpackPlugin({
            template: './main.html',
            alwaysWriteToDisk: true
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        stats: 'minimal'
    }
});