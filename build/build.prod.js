var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');

gulp.task('css:base', function () {
    gulp.src('../src/styles/base.less')
        .pipe(require('gulp-less')())
        .pipe(cleanCss())
        .pipe(gulp.dest('../dist/lib'));
});

gulp.task('css:ydui', function () {
    gulp.src('../dist/ydui.css')
        .pipe(require('ydcss-rem2px')(50))
        .pipe(cleanCss())
        .pipe(require('gulp-rename')('ydui.px.css'))
        .pipe(gulp.dest('../dist'));
});

gulp.task('flexible', function(){
    gulp.src('../src/ydui.flexible.js')
        .pipe(require('gulp-uglify')())
        .pipe(gulp.dest('../dist'));
});

gulp.task('default', ['css:base', 'css:ydui', 'flexible']);
