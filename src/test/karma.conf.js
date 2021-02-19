// Karma configuration
// http://karma-runner.github.io/0.13/config/configuration-file.html

var sourcePreprocessors = ['coverage'];

function isDebug() {
  return process.argv.indexOf('--debug') >= 0;
}

if (isDebug()) {
  // Disable JS minification if Karma is run with debug option.
  sourcePreprocessors = [];
}

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: 'src/test/'.replace(/[^/]+/g, '..'),

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      
      'bower_components/angular-mocks/angular-mocks.js',
      
      // endbower
      

      // app:js
      
      'src/app/app.constants.js',
      
      // endapp

      'src/test/spec/helpers/helperFunction.js',
      'src/test/**/!(karma.conf|protractor.config).js',

      'src/app/*.spec.js',
      'src/app/{modules,components,widgets}/**/*.spec.js',

      { pattern: 'src/resources/**/*.json', included: false },
      { pattern: 'src/resources/**/*.js', included: true, serve: true },
      { pattern: 'src/public/**', included: false }
    ],


    // list of files / patterns to exclude
    exclude: [
      'src/test/e2e/**',
      'src/test/protractor.config.js',
      'src/test/mocks/*.js',
      'src/app/modules/config/configProviders/beacon.config.js'
    ],

    preprocessors: {
      './**/*.js': sourcePreprocessors
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/app/',
      stripSufix: '.html',

      // setting this option will create only a single module that contains templates
      moduleName: 'templates'
    },
    
    // list of reporters
    reporters: ['mocha', 'dots', 'junit', 'coverage'],

    junitReporter: {
      outputFile: '../target/test-results/karma/TESTS-results.xml'
    },

    coverageReporter: {
      dir: 'target/test-results/coverage',
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    // web server port
    port: 9876,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // to avoid DISCONNECTED messages when connecting to slow virtual machines
    browserDisconnectTimeout: 10000000, // default 2000
    browserDisconnectTolerance: 6, // default 0
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
    proxies: {
      "/resources/i18n/angular-locale_en.js": '/base/src/resources/i18n/angular-locale_en.js',
      "/assets/": "/base/src/public/assets/",
      "/resources/": "/base/src/resources/"
    }
  });
};
