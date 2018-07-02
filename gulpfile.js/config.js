const path = require('path');

const config = {};

config.app = 'app';
config.assets = `${config.app}/assets`;
config.dist = path.join(__dirname, '../', 'dist');

config.publish = {
  base: `${config.app}/views`
};
config.publish = Object.assign(config.publish, {
  pages: `${config.publish.base}/pages/**/*.hbs`,
  partials: `${config.publish.base}/partials/**/*.hbs`,
  layouts: `${config.publish.base}/layouts/**/*.hbs`,
  helpers: `${config.publish.base}/helpers/*.js`,
  hbLayouts: './node_modules/handlebars-layouts/index.js',
  data: `${config.publish.base}/data/global/**/*`
});

config.styles = {
  base: `${config.assets}`
};
config.styles = Object.assign(config.styles, {
  stylesheet: `${config.styles.base}/**/main.scss`
});

config.scripts = {
  base: `${config.assets}/scripts`
};
config.scripts = Object.assign(config.scripts, {
  script: `${config.scripts.base}/**/index.js`,
  scriptAEM: `${config.assets}`
});

config.images = {
  base: `${config.assets}/resources`
}


module.exports.config = config;