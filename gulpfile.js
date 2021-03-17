var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('inline-css', ['sass'], function () {
  return gulp.src('src/*.html')
    .pipe($.inlineCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-images', function () {
  return gulp.src('dist/img', {read: false})
    .pipe($.clean());
});

gulp.task('images', ['clean-images'], function () {
  return gulp.src('src/img/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/img'));
});

// http://www.mailgun.com/
var emailOptions = {
  key: '',
  sender: '',
  recipient: '',
  subject: 'This is a test email'
};

gulp.task('send-email', function () {
  gulp.src('dist/index.html')
    .pipe($.mailgun(emailOptions));
});

gulp.task('watch', function () {
  gulp.watch(['src/sass/**/*.sass', 'src/**/*.html'], ['inline-css']);
  gulp.watch('src/img/*', ['images']);
});

gulp.task('build', ['inline-css', 'images']);
gulp.task('test', ['send-email']);
gulp.task('default', ['watch']);
