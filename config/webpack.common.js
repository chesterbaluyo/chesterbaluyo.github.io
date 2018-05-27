const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const helpers = require('./helpers');
const rxPaths = require('rxjs/_esm5/path-mapping');
const webpack = require('webpack'); //to access built-in plugins
const { CommonsChunkPlugin } = webpack.optimize;
const { ProvidePlugin } = webpack;

const fs = require('fs');
const path = require('path');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');

module.exports = {
    context: helpers.root('src'),
    entry: {
        app: './app.ts',
        polyfills: './polyfills.ts',
        styles: './styles.scss'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['./node_modules'],
        alias: rxPaths(),
    },
    resolveLoader: {
        modules: [
            './node_modules'
        ],
        alias: rxPaths()
    },
    module: {
        rules: [
            {
                test: /^(.(?!component))*\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            }, {
                test: /component\.css$/,
                use: 'raw-loader'
            }, {
                test: /^(.(?!component))*\.scss$/,
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
                test: /component\.scss$/,
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
        new CleanWebpackPlugin([helpers.root('dist')], {
            allowExternal: true
        }),
        //TODO: Remove this after Ng-Bootstrap module installed https://ng-bootstrap.github.io/#/getting-started
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new CommonsChunkPlugin({
            "name": [
                "inline"
            ],
            "minChunks": null
        }),
        new CommonsChunkPlugin({
            "name": [
                "vendor"
            ],
            "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
            "chunks": [
                "main"
            ]
        }),
        new CommonsChunkPlugin({
            "name": [
                "app"
            ],
            "minChunks": 2,
            "async": "common"
        }),
    ],
};
