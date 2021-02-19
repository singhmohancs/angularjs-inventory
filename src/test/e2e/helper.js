'use strict';

var TIMEOUT = 1000;

function Helper() {
  var self = this;
}

Helper.prototype.safeLogout = function () {
  //safe safeLogout
};
/**
 * @name waitForUrlToChangeTo
 * @description Wait until the URL changes to match a provided regex
 * @param {RegExp} urlRegex wait until the URL changes to match this regex
 * @returns {!webdriver.promise.Promise} Promise
 */
Helper.prototype.waitForUrlToChangeTo = function (urlRegex) {
  var currentUrl;

  return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
    currentUrl = url;
  }
  ).then(function waitForUrlToChangeTo() {
    return browser.wait(function waitForUrlToChangeTo() {
      return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
        return urlRegex.test(url);
      });
    }, 10000);
  }
  );
};

/**
 * @name waitForElement
 * @description wait for element to appear in DOM 
 * usecase <a href="" ng-if="true">demo</a>
 * @param {element} element
 * @param {timeout} timeout
 * @returns {!webdriver.promise.Promise} Promise
 */
Helper.prototype.waitForElement = function (element, timeout) {
  browser.wait(function () {
    return element.isPresent().then(function (isPresent) {
      return isPresent && element.isDisplayed();
    });
  }, timeout || TIMEOUT);
};

/**
 * @name waitForElementToDisappear
* @description wait for element to appear in DOM 
* usecase <a href="" ng-if="false">demo</a>
* @param {element} element
* @param {timeout} timeout
* @returns {!webdriver.promise.Promise} Promise
*/
Helper.prototype.waitForElementToDisappear = function (element, timeout) {
  var self = this;
  browser.wait(function () {
    return element.isPresent().then(function (isPresent) {
      if (isPresent) {
        return self.not(element.isDisplayed());
      }
      else {
        return true;
      }
    });
  }, timeout || TIMEOUT);
};

/**
 * @name selectOptionByText
* @description select an option by text from a list
* <select><option>demo1</option><option>demo2</option></select>
* can get element by text[demo1 | demo2]
* @param {element} select
* @param {timeout} timeout
* @returns {!webdriver.promise.Promise} Promise
*/
Helper.prototype.selectOptionByText = function (select, text) {
  var optionElement = select.element(by.cssContainingText('option', text));
  this.selectOption(optionElement);
};

Helper.prototype.selectOption = function (optionElement) {
  if (this.isFirefox()) {
    browser.actions().mouseMove(optionElement).mouseDown().mouseUp().perform();
  }
  else {
    optionElement.click();
  }
};

// zero-based index
Helper.prototype.selectOptionByIndex = function (select, index) {
  var optionElement = select.all(by.css('option')).get(index);
  this.selectOption(optionElement);
};

// Promise helper
Helper.prototype.not = function (promise) {
  return promise.then(function (result) {
    return !result;
  });
};

Helper.prototype.fill = function (input, text) {
  input.clear();
  input.sendKeys(text);
};


Helper.prototype.isFirefox = function () {
  return this.browserName === 'firefox';
};

Helper.prototype.createMessage = function (context, message) {
  context.message = function () {
    var msg = message
      .replace('{{actual}}', context.actual)
      .replace('{{not}}', (context.isNot ? ' not ' : ' '));

    if (context.actual.locator) {
      msg = msg.replace('{{locator}}', context.actual.locator());
    }
    return msg;
  };
};

module.exports = new Helper();