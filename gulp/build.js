var fs = require('fs'),
  gulp = require('gulp'),
  lazypipe = require('lazypipe'),
  footer = require('gulp-footer'),
  sourcemaps = require('gulp-sourcemaps'),
  rev = require('gulp-rev'),
  htmlmin = require('gulp-htmlmin'),
  ngAnnotate = require('gulp-ng-annotate'),
  prefix = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  useref = require("gulp-useref"),
  revReplace = require("gulp-rev-replace")
plumber = require('gulp-plumber'),
  gulpIf = require('gulp-if'),
  handleErrors = require('./handleErrors'),
  pump = require('pump');

var config = require('./config');

var initTask = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(footer, ';');
var jsTask = lazypipe()
  .pipe(ngAnnotate)
  .pipe(uglify);
var cssTask = lazypipe()
  .pipe(prefix)
  .pipe(cssnano, {zindex: false});

module.exports = function (callback) {
  var templates = fs.readFileSync(config.tmp + '/templates.js');
  var manifest = gulp.src(config.revManifest);

  pump([
    gulp.src([config.public + '*.html',
      '!' + config.app + '/**/*.html',
      '!' + config.bower + '**/*.html']),
    plumber({ errorHandler: handleErrors }),
    useref({}, initTask),
    gulpIf('**/app.js', footer(templates)),
    gulpIf('*.js', jsTask()),
    gulpIf('*.css', cssTask()),
    gulpIf('*.html', htmlmin({ collapseWhitespace: true })),
    gulpIf('**/*.!(html)', rev()),
    revReplace({ manifest: manifest }),
    sourcemaps.write('.'),
    gulp.dest(config.dist)
  ], callback);

}
