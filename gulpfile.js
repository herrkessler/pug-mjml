var gulp        = require('gulp');
    jade        = require('gulp-jade'),
    mjml        = require('gulp-mjml'),
    rename      = require("gulp-rename"),
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    server      = tinylr();

gulp.task('jade-2-mjml', function () {
  gulp.src('views/index.jade')
    .pipe(jade())
    .pipe(rename("index.mjml"))
    .pipe(mjml())
    .pipe(gulp.dest('./html'))
    .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: ['html/', 'assets/']
    }
  });
});

gulp.task('watch', function() {
  server.listen(35728, function(err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('views/*.jade', ['jade-2-mjml']);

  });
});

gulp.task('default', ['watch', 'jade-2-mjml', 'browser-sync']);