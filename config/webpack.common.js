const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.ts',
        vendor: './vendor.ts',
        polyfills: './polyfills.ts'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, 'src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                use: 'raw-loader'
            }, {
                test: /\.(scss)$/,
                exclude: path.resolve(__dirname, 'src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: { path: 'postcss.config.js' }
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
                test: /\.(scss)$/,
                include: path.resolve(__dirname, 'src/app'),
                use: [{
                    loader: 'raw-loader',
                }, {
                    loader: 'sass-loader'
                }]
            }, {
                test: /\.tsx?$/,
                use: ['ts-loader', 'angular2-template-loader']
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        //TODO: Remove this after Ng-Bootstrap module installed https://ng-bootstrap.github.io/#/getting-started
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ],
};
