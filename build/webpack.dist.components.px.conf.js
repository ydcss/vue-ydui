const merge = require('webpack-merge');
const distCommonWebpackConfig = require('./webpack.dist.common.conf');
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = merge(distCommonWebpackConfig, {
    entry: {
        "/lib.px/actionsheet/index": "./src/components/actionsheet/index.js",
        "/lib.px/badge/index": "./src/components/badge/index.js",
        "/lib.px/button/index": "./src/components/button/index.js",
        "/lib.px/cell/index": "./src/components/cell/index.js",
        "/lib.px/cityselect/index": "./src/components/cityselect/index.js",
        "/lib.px/dialog/index": "./src/components/dialog/index.js",
        "/lib.px/grids/index": "./src/components/grids/index.js",
        "/lib.px/icons/index": "./src/components/icons/index.js",
        "/lib.px/infinitescroll/index": "./src/components/infinitescroll/index.js",
        "/lib.px/keyboard/index": "./src/components/keyboard/index.js",
        "/lib.px/layout/index": "./src/components/layout/index.js",
        "/lib.px/list/index": "./src/components/list/index.js",
        "/lib.px/navbar/index": "./src/components/navbar/index.js",
        "/lib.px/progressbar/index": "./src/components/progressbar/index.js",
        "/lib.px/pullrefresh/index": "./src/components/pullrefresh/index.js",
        "/lib.px/scrolltab/index": "./src/components/scrolltab/index.js",
        "/lib.px/sendcode/index": "./src/components/sendcode/index.js",
        "/lib.px/slider/index": "./src/components/slider/index.js",
        "/lib.px/spinner/index": "./src/components/spinner/index.js",
        "/lib.px/switch/index": "./src/components/switch/index.js",
        "/lib.px/tab/index": "./src/components/tab/index.js",
        "/lib.px/tabbar/index": "./src/components/tabbar/index.js",
        "/lib.px/countup/index": "./src/components/countup/index.js",
        "/lib.px/popup/index": "./src/components/popup/index.js",
        "/lib.px/rate/index": "./src/components/rate/index.js",
        "/lib.px/countdown/index": "./src/components/countdown/index.js",
        "/lib.px/textarea/index": "./src/components/textarea/index.js",
        "/lib.px/rollnotice/index": "./src/components/rollnotice/index.js",
        "/lib.px/input/index": "./src/components/input/index.js",
        "/lib.px/flexbox/index": "./src/components/flexbox/index.js",
        "/lib.px/radio/index": "./src/components/radio/index.js",
        "/lib.px/checkbox/index": "./src/components/checkbox/index.js",
        "/lib.px/backtop/index": "./src/components/backtop/index.js",
        "/lib.px/accordion/index": "./src/components/accordion/index.js",
        "/lib.px/datetime/index": "./src/components/datetime/index.js",
        "/lib.px/lightbox/index": "./src/components/lightbox/index.js",
        "/lib.px/timeline/index": "./src/components/timeline/index.js",
        "/lib.px/step/index": "./src/components/step/index.js",
        "/lib.px/checklist/index": "./src/components/checklist/index.js",
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /(\d*\.?\d+)rem/g,
                            replacement: function (match, p1) {
                                return parseInt(p1 * 50) + 'px';
                            }
                        }
                    ]
                })
            }
        ]
    },
    vue: {
        postcss: [require('./rem2px')(50)]
    },
    plugins: [
        new StringReplacePlugin()
    ]
});
