const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const pkg = require('../package.json');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: "[name].js",
        chunkFilename: "[name].js",
        library: 'ydui',
        libraryTarget: 'umd'
    },
    externals: {
        vue: {
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue",
            root: "Vue"
        }
    },
    plugins: [
        new webpack.BannerPlugin(pkg.name + ' v' + pkg.version + ' by YDCSS (c) ' + new Date().getFullYear() + ' Licensed ' + pkg.license),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});
