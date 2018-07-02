const gulp       = require('gulp');
const config     = require('../config').config;
const requireDir = require('require-dir');

// Require all tasks in gulpfile/tasks, including subfolders
requireDir('../tasks', { recurse: true });

gulp.task('watch', () => {
  gulp.watch(`${config.publish.base}/**/*`, () => gulp.start('publish'));
  gulp.watch(`${config.styles.base}/**/*.less`, () => gulp.start('styles'));
  gulp.watch(`${config.scripts.base}/**/*.js`, () => gulp.start('scripts'));
  gulp.watch(`${config.images.base}/**/*`, () => gulp.start('images'));
});