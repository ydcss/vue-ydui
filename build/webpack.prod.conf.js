const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./base.conf');
const pkg = require('../package.json');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'ydui.js',
        library: 'ydui',
        libraryTarget: 'umd'
    },
    externals: {
        vue: 'Vue'
    },
    vue: {
        loaders: {
            less: ExtractTextPlugin.extract('css!less')
        }
    },
    plugins: [
        new webpack.BannerPlugin(pkg.name + ' v' + pkg.version + ' by YDCSS (c) ' + new Date().getFullYear() + ' Licensed ' + pkg.license),
        new ExtractTextPlugin('ydui.css'),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});
