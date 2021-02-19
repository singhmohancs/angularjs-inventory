/**
 * @ngdoc constant
 * @name inventory.core.constant
 * @module inventory.core
 *
 * @description
 * Create an Angular Constant for vendor libraries' global variables. Lets use everythings as angular dependecy 
 * avoid global variable/objects inside angular app
 *
 */

/* global moment:false */
(function () {
  'use strict';
  angular
    .module('inventory.core')
    .constant('CONST', (function () {
      return {};
    })())
})();
