var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src('../src/styles/base.less')
        .pipe(require('gulp-less')())
        .pipe(require('gulp-clean-css')())
        .pipe(gulp.dest('../dist/lib'));
});
