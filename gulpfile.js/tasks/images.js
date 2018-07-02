const gulp       = require('gulp');
const config     = require('../config').config;


gulp.task('images', () => {
  gulp.src(`${config.images.base}/**/*`)
    .pipe(gulp.dest(`${config.dist}/assets/resources`));
});