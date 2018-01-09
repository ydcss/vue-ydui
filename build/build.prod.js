var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var through = require('through2');

var replaceRem2Px = function () {
    function fn(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(createError(file, 'Streaming not supported'));
        }

        let text = file.contents.toString();

        if (/\d*\.?\d+rem/.test(text)) {
            text = text.replace(/(\d*\.?\d+)rem/g, function (match, m1) {
                return parseInt(m1 * 50) + 'px';
            });
        }

        file.contents = new Buffer(text);
        callback(null, file);
    }

    return through.obj(fn);
};

gulp.task('css:base', function () {
    gulp.src('../src/styles/base.less')
        .pipe(require('gulp-less')())
        .pipe(cleanCss())
        .pipe(rename('ydui.base.css'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('css:ydui', function () {
    gulp.src('../dist/ydui.rem.css')
        .pipe(require('ydui-rem2px')(50))
        .pipe(cleanCss())
        .pipe(rename('ydui.px.css'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('js:ydui', function () {
    gulp.src('../dist/ydui.rem.js')
        .pipe(replaceRem2Px())
        .pipe(rename('ydui.px.js'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('flexible', function () {
    gulp.src('../src/ydui.flexible.js')
        .pipe(require('gulp-uglify')())
        .pipe(gulp.dest('../dist'));
});

gulp.task('default', ['css:base', 'css:ydui', 'js:ydui', 'flexible']);
