'use strict';

const postcss = require('postcss');

module.exports = postcss.plugin('vue-ydui-rem2px', function (size) {
    return function (css, result) {
        const oldCssText = css.toString();
        let newCssText = '';

        if (/\d*\.?\d+rem/.test(oldCssText)) {
            newCssText = oldCssText.replace(/(\d*\.?\d+)rem/g, function (match, m1) {
                return parseInt(m1 * size) + 'px';
            });
        } else {
            return oldCssText;
        }

        result.root = postcss.parse(newCssText);
    };
});
