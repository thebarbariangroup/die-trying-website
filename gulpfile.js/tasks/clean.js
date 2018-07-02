const gulp       = require('gulp');
const config     = require('../config').config;
const del        = require('del');

gulp.task('clean', (cb) => {
  return del([config.dist], cb);
});

