const gulp       = require('gulp');
const requireDir = require('require-dir');

// Require all tasks in gulpfile/tasks, including subfolders
requireDir('./tasks', { recurse: true });

ENV = 'dev';

gulp.task('dev', ['clean'], () => {
  console.log('Beginning build...');
  gulp.start('publish', 'styles', 'scripts', 'images', 'watch');
});

gulp.task('build', ['clean'], () => {
  ENV = 'prod';
  console.log('Beginning build...');
  gulp.start('publish', 'styles', 'scripts', 'images');
});
