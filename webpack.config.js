const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');


module.exports = env => {
    if (env && env.production) {
        return prodConfig;
    } else {
        return devConfig;
    }
};
