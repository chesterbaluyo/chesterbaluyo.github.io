const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: './app.ts',
      vendor: './vendor.ts'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'dist/[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, '')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            }, {
                test: /\.(scss)$/,
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
                test: /\.tsx?$/,
                use: ['ts-loader', 'angular2-template-loader']
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/styles.css'),
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
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        compress: true
    }
};
