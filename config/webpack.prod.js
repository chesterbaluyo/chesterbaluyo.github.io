const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    context: path.resolve(__dirname, 'src'),
    devtool: 'source-map',
    output: {
        filename: 'dist/[name].bundle.[hash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new ExtractTextPlugin('dist/[name].bundle.[hash].css'),
        new HtmlWebpackPlugin({
            template: './main.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env' : {
                ENV : JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            options: {
                htmlLoader: {
                    // minimize: false // workaround for ng2
                    // see https://github.com/angular/angular/issues/10618#issuecomment-250322328
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                    ],
                    customAttrAssign: [/\)?\]?=/]
                }
            }
        })
    ],
});