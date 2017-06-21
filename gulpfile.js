var gulp        = require('gulp');
    pug        = require('gulp-pug'),
    mjml        = require('gulp-mjml'),
    rename      = require("gulp-rename"),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

gulp.task('pug-2-mjml', function () {
  gulp.src('views/index.pug')
    .pipe(pug())
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
  gulp.watch('views/*.pug', ['pug-2-mjml']);
});

gulp.task('default', ['watch', 'pug-2-mjml', 'browser-sync']);
