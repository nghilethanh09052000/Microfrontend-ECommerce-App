const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');


const prodConfig = {
    mode:'production',
    output: {
        filename:'[name].[contenthash].js',
        publicPath:'/authentication/latest/' //For storing in S3
    },
    plugins: [
        new ModuleFederationPlugin({
            name:'authentication',
            filename:'remoteEntry.js',
            exposes: {
                './AuthenticationApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies
        })
    ]
}


module.exports = merge( commonConfig , prodConfig);