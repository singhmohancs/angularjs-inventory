'use strict';
var users = require('../../mocks/users');

var SignInPage = function () {
  this.username = element(by.model('$ctrl.credentials.email'));
  this.password = element(by.model('$ctrl.credentials.password'));
  this.loginBtn = element(by.css('button[type=submit]'));
  this.form = element(by.css('form[name="$ctrl.loginForm"]'));

  this.signIn = function (user) {
    Helper.fill(this.username, user.email);
    Helper.fill(this.password, user.password);
    return this.submitForm();
  };

  this.submitForm = function (user) {
    return this.loginBtn.click();
  };

  this.ensureSignedIn = function () {
    var self = this;
    browser.get('/#/sign-in');
    browser.getCurrentUrl().then(function (url) {
      if (url.indexOf('sign-in') != -1) {
        self.signIn(users.registeredUserCorrectCreds);
      }
    });
  };
}

module.exports = SignInPage;