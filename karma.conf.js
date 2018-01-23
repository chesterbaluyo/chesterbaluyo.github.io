//TODO: Create separate webpack test config
const webpackConfig = require('./config/webpack.test');
// const webpackConfig = require('./webpack.config')();

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        autoWatch: true,
        singleRun: true,
        files: [
            './src/test.ts'
        ],
        preprocessors: {
            './src/test.ts': ['webpack']
        },
        //Work around to this issue -> https://github.com/angular/angular-cli/issues/2125
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        webpack: webpackConfig,
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
    })
};