const os = require('os');

const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const JasmineReporters = require('jasmine-reporters');

const prefix = 'src/test/'.replace(/[^/]+/g, '..');
const seleniumFolder = 'node_modules/protractor/node_modules/webdriver-manager/selenium/';

var webbrowserDriver = '';
if (os.platform() === 'win32') {
  webbrowserDriver = prefix + seleniumFolder + 'chromedriver_2.38.exe';
} else {
  webbrowserDriver = prefix + seleniumFolder + 'chromedriver_2.38';
}

exports.config = {
  seleniumServerJar: prefix + seleniumFolder + 'selenium-server-standalone-3.6.0.jar',
  chromeDriver: webbrowserDriver,
  allScriptsTimeout: 20000,

  suites: {
    account: './e2e/account/*.js',
    //add more suites
  },

  capabilities: {
    'browserName': 'chrome',
    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },

  directConnect: true,

  baseUrl: 'https://localhost:8080/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: function () {
    require('./e2e/customHooks.js');
    require('./e2e/customMatchers.js');
    global.Helper = require('./e2e/helper.js');

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function () {
      angular
        .module('disableNgAnimate', [])
        .run(['$animate', function ($animate) {
          $animate.enabled(false);
        }]);
    };

    var disableCssAnimate = function () {
      angular
        .module('disableCssAnimate', [])
        .run(function () {
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = 'body * {' +
            '-webkit-transition: none !important;' +
            '-moz-transition: none !important;' +
            '-o-transition: none !important;' +
            '-ms-transition: none !important;' +
            'transition: none !important;' +
            '}';
          document.getElementsByTagName('head')[0].appendChild(style);
        });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);

    browser.driver.manage().window().setSize(1280, 1024);
    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      savePath: 'target/reports/e2e',
      consolidateAll: false
    }));
    jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
      dest: "target/reports/e2e/screenshots"
    }));
  }
};