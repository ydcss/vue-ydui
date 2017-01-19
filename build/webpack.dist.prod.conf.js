const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const distCommonWebpackConfig = require('./webpack.dist.common.conf');

module.exports = merge(distCommonWebpackConfig, {
    entry: {
        ydui: './src/index.js'
    },
    vue: {
        loaders: {
            less: ExtractTextPlugin.extract('css!less')
        }
    },
    plugins: [
        new ExtractTextPlugin('ydui.css')
    ]
});
