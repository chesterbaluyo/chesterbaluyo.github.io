const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: 'css-loader'}
                    ]
                })
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
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        compress: true
    }
};