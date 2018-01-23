const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = process.env.ENV = 'production';

module.exports = webpackMerge.smartStrategy({plugins: 'replace'})(commonConfig, {
    devtool: 'source-map',
    plugins: [
        //TODO: Disable commonsChunkPlugin when running test to avoid conflict with karma
        //Use customization of array:
        //
        //customizeArray(a, b, 'plugins') {
        // //Remove element of CommonsChunkPlugin here
        // const _a = a;
        // return [
        //    ..._a,
        //    ...b
        // ]
        //}
        //TODO: This is a duplicate of commonConfig.plugins
        new CleanWebpackPlugin([helpers.root('dist')], {
            allowExternal: true
        }),
        //TODO: Remove this after Ng-Bootstrap module installed https://ng-bootstrap.github.io/#/getting-started
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
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