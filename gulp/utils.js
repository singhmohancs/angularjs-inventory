'use strict';

var fs = require('fs');
const { filter } = require('lodash');

module.exports = {
  endsWith: endsWith,
  parseVersion: parseVersion,
  isLintFixed: isLintFixed,
  isArray: isArray,
  getProcessParams: getProcessParams
}

function endsWith(str, suffix) {
  return str.indexOf('/', str.length - suffix.length) !== -1;
};

function parseVersion() {
  var version = '2.0.0'
  return version;
}


function isLintFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed;
}

function isArray(ar) {
  return ar instanceof Array
    || Array.isArray(ar)
    || (ar && ar !== Object.prototype && isArray(ar.__proto__));
}

function getProcessParams() {
  const args = {};
  const params = filter(process.argv, (i) => {
    return i.indexOf('=') > 0
  });
  params.forEach((v) => {
    const p = v.split('=');
    const value = p[1];
    const key = p[0].replace('--', '');
    Object.assign(args,
      { [key]: value });
  });
  return args;
}