/**
 * @ngdoc Controller
 * @name inventory.Controller.ApplicationController
 * @module inventory
 *
 * @description
 * ApplicationController is base controller of application
 *
 */

(function () {
  'use strict';
  angular
    .module('inventory')
    .controller('ApplicationController', ApplicationController);
  /*@ngInject*/
  function ApplicationController() {
    var $ctrl = this;
  }
})();
