const gulp    = require('gulp');
var serve = require('gulp-serve');


gulp.task('serve', serve('dist'));
gulp.task('serve-build', serve(['dist', 'build']));
gulp.task('serve-prod', serve({
  root: ['dist', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));