const gulp       = require('gulp');
const config     = require('../config').config;
const babelify   = require("babelify");
const bro        = require('gulp-bro');

gulp.task('scripts', () => {

  const babelOptions = [
    babelify.configure({ presets: ['env'] })
  ];

  if (ENV === 'prod') {
    babelOptions.push([ 'uglifyify', { 
      global: true,
      sourceMap: false
    } ]);
  }

  const broOptions = {
    debug: true,
    transform: babelOptions
  };

  if (ENV === 'prod') {
    broOptions.debug = false;
  }



  gulp.src(`${config.scripts.base}/**/index.js`)
    .pipe(bro(broOptions))
    .pipe(gulp.dest(`${config.dist}/assets/scripts`));
});