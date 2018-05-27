const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    output: {
        filename: 'dist/[name].bundle.js',
        publicPath: '/',
        path: helpers.root(),
    },
    plugins: [
        new ExtractTextPlugin('dist/[name].bundle.css'),
        new HtmlWebpackHarddiskPlugin({
            outputPath: helpers.root()
        }),
        new HtmlWebpackPlugin({
            template: './main.html',
            alwaysWriteToDisk: true
        }),
    ],
    devServer: {
        contentBase: helpers.root(),
        historyApiFallback: true,
        // stats: 'minimal'
    }
});