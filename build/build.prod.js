var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

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

gulp.task('flexible', function () {
    gulp.src('../src/ydui.flexible.js')
        .pipe(require('gulp-uglify')())
        .pipe(gulp.dest('../dist'));
});

gulp.task('default', ['css:base', 'css:ydui', 'flexible']);
