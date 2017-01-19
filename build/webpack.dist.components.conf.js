const merge = require('webpack-merge');
const distCommonWebpackConfig = require('./webpack.dist.common.conf');
const prodEntry = require('./components.entry.json');

module.exports = merge(distCommonWebpackConfig, {
    entry: prodEntry,
});
