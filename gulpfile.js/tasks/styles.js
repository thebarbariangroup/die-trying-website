
const gulp       = require('gulp');
const config     = require('../config').config;
const plumber    = require('gulp-plumber');
const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS   = require('gulp-clean-css');
const path       = require('path');

gulp.task('styles', () => {
  if (ENV === 'prod') {
    return gulp.src(`${config.styles.stylesheet}`)
      .pipe(plumber())
      .pipe(sass())
      .pipe(cleanCSS({compatibility: 'ie11'}))
      .pipe(gulp.dest(`${config.dist}/assets/`));
  }

  return gulp.src(`${config.styles.stylesheet}`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${config.dist}/assets/`));
});