var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
 
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
        livereload: true,
        directoryListing: {
            enable: true,
            path: 'app'
        },
        open: true,
        fallback:'index.html',
        port: 9000
    }));
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['webserver', 'sass']);