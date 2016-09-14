var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
        livereload: {
            enable: true,
            filter: function(fileName) {
                if (fileName.match(/.map$/)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        open: true,
        fallback: 'index.html',
        port: 9000
    }));
});

gulp.task('uglifyjs', function() {
  if(process.env.NODE_ENV === 'development'){
    gulp.src('src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(uglify({ preserveComments: 'license' }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('dist/js'));
  }
  else{
    gulp.src('src/js/*.js')
      .pipe(uglify({ preserveComments: 'license' }))
      .pipe(gulp.dest('dist/js'));
  }
});

gulp.task('sass', function () {
  if(process.env.NODE_ENV === 'development'){
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
  }
  else{
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
  }
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('default', ['set-prod-node-env', 'sass', 'uglifyjs']);

gulp.task('dev', ['set-dev-node-env', 'webserver', 'sass', 'sass:watch', 'uglifyjs']);
