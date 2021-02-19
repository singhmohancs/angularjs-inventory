process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * import dependencies
 */
const gulp = require('gulp'),
  util = require('./utils'),
  browserSync = require('browser-sync'),
  browserSyncSpa = require('browser-sync-spa'),
  config = require('./config'),
  middleware = require('./proxy');

/**
 * serve application in dev mode
 * any change in code will be reflected to browser immediately
 */
const serveDev = () => {
  browserSync.use(browserSyncSpa({
    selector: '[ng-app]',
    history: {
      index: '/index.html'
    }
  }));
  browserSyncInit([config.public, config.app], '');
  gulp.run('watch');
}

/**
 * serve application in prod/staging mode
 * application is served from /target/www directory
 * Does not look for changes in code
 * highly recommended to run `gulp serve-dist` before you push your code
 */
const serveDist = () => {
  browserSync.use(browserSyncSpa({
    selector: '[ng-app]',
    history: {
      index: '/index.html'
    }
  }));
  browserSyncInit([config.dist, config.app], '');
}

const browserSyncInit = (baseDir, browser) => {
  browser = browser === undefined ? 'default' : browser;
  var routes = null;
  //maps URLs while application is served in dev mode.
  if (baseDir === config.app || (util.isArray(baseDir) && baseDir.indexOf(config.app) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
      '/inventory/app': 'src/app',
      '/inventory/assets': 'src/public/assets',
      '/inventory/resources': 'src/resources',
      '/app': 'src/app',
      '/assets': 'src/public/assets',
      '/resources': 'src/resources'
    };
  }
  var server = {
    baseDir: baseDir,
    routes: routes,
    port: 8080
  };
  //apply proxies if any
  if (middleware.length > 0) {
    server.middleware = middleware;
  }
  //create an instance of browserSync
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    https: true,
    browser: browser,
    port: 8080
  });
}


/**
 * export as public methods
 */
module.exports = {
  dev: serveDev,
  dist: serveDist
}