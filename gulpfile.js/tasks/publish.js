const gulp    = require('gulp');
const config  = require('../config').config;
const plumber = require('gulp-plumber');
const rename  = require("gulp-rename");
const hb      = require('gulp-hb');
const data    = require('gulp-data');
const fs      = require('fs');


gulp.task('publish', () => {
  return gulp
    .src(config.publish.pages)
    .pipe(plumber())
    .pipe(data((file) => {
      console.log('FILE: ', file.path)
      return requireUncached(file.path.replace('pages', 'data/pages').replace('.hbs', '.json'));
    }))
    .pipe(hb()
      .partials(config.publish.partials)
      .partials(config.publish.layouts)
      .helpers(config.publish.helpers)
      .helpers(config.publish.hbLayouts)
      .data(config.publish.data)
    )
    .pipe(rename((path) => {
      path.extname ='.html';
    }))
    .pipe(gulp.dest(config.dist));
});

// Need to get rid of the cached functions in default Node behavior
// https://github.com/colynb/gulp-data/issues/17
function requireUncached( $module ) {
  if (!fs.existsSync($module)) {
      return;
  }
  delete require.cache[require.resolve( $module )];
  return require( $module );
}