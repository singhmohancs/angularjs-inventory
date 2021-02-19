'use strict';

var gulp = require('gulp'),
  expect = require('gulp-expect-file'),
  sass = require('gulp-sass'),
  rev = require('gulp-rev'),
  templateCache = require('gulp-angular-templatecache'),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin'),
  ngConstant = require('gulp-ng-constant'),
  rename = require('gulp-rename'),
  eslint = require('gulp-eslint'),
  argv = require('yargs').argv,
  gutil = require('gulp-util'),
  protractor = require('gulp-protractor').protractor,
  es = require('event-stream'),
  uglify = require('gulp-uglify'),
  flatten = require('gulp-flatten'),
  fs = require('fs'),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  KarmaServer = require('karma').Server,
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  gulpIf = require('gulp-if'),
  inject = require('gulp-inject'),
  angularFilesort = require('gulp-angular-filesort'),
  naturalSort = require('gulp-natural-sort'),
  bowerFiles = require('main-bower-files'),
  pump = require('pump'),
  preprocess = require('gulp-preprocess');

var handleErrors = require('./gulp/handleErrors'),
  serve = require('./gulp/serve'),
  util = require('./gulp/utils'),
  build = require('./gulp/build'),
  localeUtil = require('./gulp/locale');

var yorc = {
  languages: [
    "en"
  ]
};

var config = require('./gulp/config');
var env = require('dotenv').config({
  path: './.env',
});
/**
 * add `buildVersion` in app.constants.js
 * `buildVersion` will be used to apply deployment version on static assets(locale files) 
 * @todo the same will be applied to assets - js, image, and css files.
 * */
Object.assign(env, {
  buildVersion: new Date().getTime()
});


gulp.task('clean', function () {
  return del(['target/'], {
    dot: true
  });
});

gulp.task('images', function (callback) {

  pump([
    gulp.src(config.public + 'assets/images/**'),
    changed(config.dist + 'assets/images'),
    imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }),
    rev(),
    gulp.dest(config.dist + 'assets/images'),
    rev.manifest(config.revManifest, {
      base: config.dist,
      merge: true
    }),
    gulp.dest(config.dist),
    browserSync.reload({
      stream: true
    })
  ], callback);


});

gulp.task('sass', function (callback) {
  var remains = 0;
  //compile SASS
  remains++;
  pump([
    gulp.src(config.sassSrc),
    expect(config.sassSrc),
    /*changed(config.cssDir, {
      extension: '.css'
    }),*/
    sass({
      includePaths: config.bower
    }),
    gulp.dest(config.cssDir)
  ], completed);

  //copy fonts from bower_components
  remains++;
  pump([
    gulp.src([config.bower + '**/fonts/**/*.{woff,woff2,svg,ttf,eot,otf}']),
    changed(config.public + 'assets/fonts'),
    flatten(),
    gulp.dest(config.public + 'assets/fonts')
  ], completed);

  function completed(error) {
    console.log(error);
    if (--remains === 0) {
      callback(null, '');
    }
  }
});

gulp.task('languages', function (callback) {
  var locales = yorc.languages.map(function (locale) {
    return config.bower + 'angular-i18n/angular-locale_' + locale + '.js';
  });
  pump([
    gulp.src(locales),
    changed(config.resources + 'i18n/'),
    gulp.dest(config.resources + 'i18n/')
  ], callback);
});

gulp.task('styles', ['sass'], function () {
  return gulp.src(config.public + 'assets/css')
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('inject', ['inject:dep', 'inject:app']);
gulp.task('inject:dep', ['inject:test', 'inject:vendor']);
gulp.task('copy', function (callback) {
  var remains = 0;
  //copy font css
  remains++;
  pump([
    gulp.src(config.public + 'assets/font-awesome/css/*'),
    changed(config.dist + 'assets/css'),
    gulp.dest(config.dist + 'assets/css/')
  ], completed);

  //copy font
  remains++;
  pump([
    gulp.src(config.public + 'assets/font-awesome/fonts/*'),
    changed(config.dist + 'assets/fonts'),
    gulp.dest(config.dist + 'assets/fonts/')
  ], completed);

  //copy sound
  remains++;
  pump([
    gulp.src(config.public + 'assets/sounds/*'),
    changed(config.dist + 'assets/sounds'),
    gulp.dest(config.dist + 'assets/sounds/')
  ], completed);

  //copy glyphicon font css
  remains++;
  pump([
    gulp.src(config.public + 'assets/glyphicons/*.css'),
    changed(config.dist + 'assets/glyphicons'),
    gulp.dest(config.dist + 'assets/glyphicons/')
  ], completed);

  //copy locale files
  remains++;
  pump([
    gulp.src(config.resources + 'i18n/**'),
    changed(config.dist + 'resources/i18n/'),
    gulp.dest(config.dist + 'resources/i18n/')
  ], completed);

  remains++;
  pump([
    gulp.src(config.resources + '*.json'),
    changed(config.dist + 'resources/'),
    gulp.dest(config.dist + 'resources/')
  ], completed);

  //copy assets to public
  remains++;
  pump([
    gulp.src([config.public + 'assets/**/*.{woff,woff2,svg,ttf,eot,otf}',], {
      base: config.public + 'assets/'
    }),
    changed(config.dist + 'assets'),
    gulp.dest(config.dist + 'assets/')
  ], completed);

  //copy other assets
  remains++;
  pump([
    gulp.src([
      config.public + 'robots.txt',
      config.public + 'favicon.ico',
      config.public + 'robots.txt',
      config.public + '.htaccess',
      config.public + 'manifest.json'
    ], {
        dot: true
      }),
    changed(config.dist),
    gulp.dest(config.dist)
  ], completed);

  function completed(error) {
    console.log(error);
    if (--remains === 0) {
      callback(null, '');
    }
  }
});

/**
 * @doc Helper
 * @type function
 * @name inject:prep
 *
 * @description
 * Prepare the template for injection.
 */
function replicateIndexTemplate(clean, cb) {
  if (!clean) {
    var clean = false;
  }
  if (!fs.existsSync(config.public + 'index.html') || clean) {
    return gulp.src([config.public + 'index.template'])
      .pipe(plumber({
        errorHandler: handleErrors
      }))
      .pipe(preprocess({ context: { APP_ENV: env.TYFY_ENV, APP_DEBUG: true } }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest(config.public))
      .on('end', function () { cb() });
  } else {
    cb();
  }
}

/**
 * @doc task
 * @type function
 * @name inject:app
 *
 * @description
 * read application files -> filesort -> angular sort and inject in the index.html
 */
gulp.task('inject:app', function (callback) {
  var injectOptions, injectFiles, remains = 0;

  injectOptions = {
    addRootSlash: false,
    ignorePath: ['src'],
    relative: true
  };

  //get steram of sorted files
  remains++;
  injectFiles = pump([
    gulp.src(
      [
        '!' + config.app + '{modules,components,widgets}/**/*.spec.js',
        '!' + config.app + '*.spec.js',
        '!' + config.app + '*.prod.js',
        config.app + '{modules,components,widgets,layouts}/**/*.js',
        config.app + '*.js'
      ]
    ),
    naturalSort(),
    angularFilesort()
  ], completed);

  //inject files to index.html
  remains++;
  pump([
    gulp.src(config.public + 'index.html'),
    inject(injectFiles, injectOptions),
    gulp.dest(config.public)
  ], completed);

  function completed(error) {
    console.log(error);
    if (--remains === 0) {
      callback(null, '');
    }
  }

});

/**
 * @doc task
 * @type function
 * @name inject:vendor
 *
 * @description
 * Read deps from bower.json and inject to index.html
 */
gulp.task('inject:vendor', function (callback) {
  pump([
    gulp.src(config.public + 'index.html'),
    inject(gulp.src(bowerFiles(), {
      read: false
    }), {
        name: 'bower',
        relative: true
      }),
    gulp.dest(config.public)
  ], callback);
});

/**
 * @doc task
 * @type function
 * @name inject:test
 *
 * @description
 * Read deps from bower.json and inject to karma.conf.js
 */
gulp.task('inject:test', function (callback) {
  pump([
    gulp.src(config.test + 'karma.conf.js'),
    inject(gulp.src(bowerFiles({
      overrides: {
      },
      includeDev: true,
      filter: ['**/*.js']
    }), {
        read: false
      }), {
        starttag: '// bower:js',
        endtag: '// endbower',
        transform: function (filepath) {
          return '\'' + filepath.substring(1, filepath.length) + '\',';
        }
      }),
    gulp.dest(config.test)
  ], callback);
});


/**
 * @doc task
 * @type function
 * @name inject:karma:app
 *
 * @description
 * read application files -> filesort -> angular sort and inject in karma.conf.js
 */
gulp.task('inject:karma:app', function (callback) {
  setTimeout(function () {
    var injectOptions, injectFiles, remains = 0;

    injectOptions = {
      relative: false,
      starttag: '// app:js',
      endtag: '// endapp',
      transform: function (filepath) {
        return '\'' + filepath.substring(1, filepath.length) + '\',';
      }
    };
  
    //get steram of sorted files
    remains++;
    injectFiles = pump([
      gulp.src(
        [
          '!' + config.app + '{modules,components,widgets}/**/*.spec.js',
          '!' + config.app + '*.spec.js',
          config.app + '{modules,components,widgets,layouts}/**/*.js',
          config.app + '*.js'
        ]
      ),
      naturalSort(),
      angularFilesort()
    ], completed);
  
    //inject files to karma.conf.js
    remains++;
    pump([
      gulp.src(config.test + 'karma.conf.js'),
      inject(injectFiles, injectOptions),
      gulp.dest(config.test)
    ], completed);
  
    function completed(error) {
      console.log(error);
      if (--remains === 0) {
        callback(null, '');
      }
    }
  }, 1000);  

});

gulp.task('inject:troubleshoot', function (callback) {
  /* this task removes the troubleshooting content from index.html*/
  pump([
    gulp.src(config.public + 'index.html'),
    inject(gulp.src('', {
      read: false
    }), {
        starttag: '<!-- inject:troubleshoot -->',
        removeTags: true,
        transform: function () {
          return '<!-- Angular views -->';
        }
      }),
    gulp.dest(config.public)
  ], callback);
});

gulp.task('assets:prod', ['images', 'styles', 'html'], build);


gulp.task('html', function (callback) {
  /*
  @TODO Getting below error with pump
  html' errored after 998 ms
 [22:23:07] Error: premature close
 */
  /*
   pump([
      gulp.src(config.app + '{modules,components,widgets,layouts}\/**\/*.html'),
      htmlmin({
        collapseWhitespace: true
      }),
      templateCache({
        module: 'inventory',
        root: 'app',
        moduleSystem: 'IIFE'
      }),
      gulp.dest(config.tmp)
    ], callback);

  */
  return gulp.src(config.app + '{modules,components,widgets,layouts}/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(templateCache({
      module: 'inventory',
      root: 'app',
      moduleSystem: 'IIFE'
    }))
    .pipe(gulp.dest(config.tmp));



});

gulp.task('ngconstant:dev', function (callback) {
  Object.assign(env, {
    isDevEnv: true
  });
  
  pump([
    ngConstant({
      name: 'inventory.envConfig',
      constants: {
        'ENV_CONFIG': env
      },
      deps: ['ngAnimate'],
      template: config.constantTemplate,
      stream: true
    }),
    rename('app.constants.js'),
    gulp.dest(config.app)
  ], callback);
});

gulp.task('ngconstant:prod', function (callback) {
  pump([
    ngConstant({
      name: 'inventory.envConfig',
      constants: {
        'ENV_CONFIG': env
      },
      deps: ['ngAnimate'],
      template: config.constantTemplate,
      stream: true
    }),
    rename('app.constants.js'),
    uglify(),
    gulp.dest(config.app)
  ], callback);
});

// check app for eslint errors
gulp.task('eslint', function (callback) {
  pump([
    gulp.src(['gulpfile.js', config.app + '{modules,components,widgets,layouts}/**/*.js', config.app + 'app.js', config.app + 'app.controller.js', config.app + 'app.constants.js', config.app + 'app.routes.js']),
    eslint(),
    eslint.format(),
    eslint.failOnError()
  ], callback);
});

// check app for eslint errors anf fix some of them
gulp.task('eslint:fix', function (callback) {
  pump([
    gulp.src(
      [
        '!' + config.app + '{modules,components,widgets}/**/*.spec.js',
        '!' + config.app + '*.spec.js',
        config.app + '{modules,components,widgets,layouts}/**/*.js',
        config.app + 'app.js',
        config.app + 'app.controller.js',
        config.app + 'app.constants.js',
        config.app + 'app.routes.js'
      ]
    ),
    eslint({
      fix: true
    }),
    eslint.format(),
    gulpIf(util.isLintFixed, gulp.dest(config.app + 'app'))
  ], callback);
});

gulp.task('test:watch', ['inject:test', 'inject:karma:app', 'ngconstant:dev'], function (done) {
  new KarmaServer({
    configFile: __dirname + '/' + config.test + 'karma.conf.js',
    autoWatch: true,
    singleRun: false
  }, function () {
    done();
  }).start();
});

gulp.task('test', ['inject:test', 'inject:karma:app', 'ngconstant:dev'], function (callback) {
  new KarmaServer({
    configFile: __dirname + '/' + config.test + 'karma.conf.js',
    singleRun: true
  }, function (testResult) {
    //callback(0);
    /**
     * @todo uncomment following line when ready to refactore testcases.
     */
    testResult == 1 ? callback('Testcases are failed.') : callback(0);
    //where @param testResult
  }).start();
});

gulp.task('watch', function () {
  gulp.watch('bower.json', ['install']);
  gulp.watch(['gulpfile.js'], ['ngconstant:dev']);
  gulp.watch([config.app + 'layouts/scss/**', config.app + '{modules,components}/**/*.scss'], ['styles']);
  gulp.watch(config.public + 'assets/images/**', ['images']);
  gulp.watch([config.app + '{modules,components,widgets,layouts}/**/*.js', config.app + 'app.js', config.app + 'app.controller.js', config.app + 'app.constants.js', config.app + 'app.routes.js'], ['inject:app']);
  gulp.watch([config.public + '*.html', config.app + '{modules,components,widgets,layouts}/**/*.html', config.app + 'resources/i18n/**']).on('change', browserSync.reload);
});

gulp.task('install', function () {
  var tasksList = ['inject:vendor', 'ngconstant:dev', 'languages', 'inject:app', 'inject:troubleshoot'];
  runSequence.apply(null, tasksList);
});

/**
 * serve application in dev mode
 */
gulp.task('serve', function (cb) {
  replicateIndexTemplate(true, function () {
    runSequence('install', serve.dev);
  }, cb);
});
/**
 * serve application in prod/staging mode.
 */
gulp.task('serve-dist', serve.dist);

/**
 * Create a file version.json providing the current version property (current timestamp)
 */
gulp.task('versioning', function () {
  fs.writeFileSync(config.dist + 'version.json', JSON.stringify({version: env.buildVersion}));
});

gulp.task('build', ['clean'], function (cb) {
  replicateIndexTemplate(true, function () {
    var tasksList = [['copy', 'inject:vendor', 'ngconstant:prod', 'languages'], 'inject:app', 'inject:troubleshoot', 'assets:prod', 'inject:test', 'versioning'];
    runSequence.apply(null, tasksList);
  }, cb);
});

gulp.task('default', ['serve']);
/* to run individual suites pass `gulp itest --suite suiteName` */
gulp.task('protractor', function () {
  var configObj = {
    configFile: config.test + 'protractor.config.js'
  };
  if (argv.suite) {
    configObj['args'] = ['--suite', argv.suite];
  }
  return gulp.src([])
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(protractor(configObj))
    .on('error', function () {
      gutil.log('E2E Tests failed');
      process.exit(1);
    });
});

gulp.task('itest', ['protractor']);

gulp.task('locale:test', localeUtil.compare);
gulp.task('locale:update', localeUtil.update);
gulp.task('locale:add', localeUtil.create);
