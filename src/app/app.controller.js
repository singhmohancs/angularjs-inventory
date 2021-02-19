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
    .controller('ApplicationController', ['$scope', '$pouchDB', '$timeout', ApplicationController]);
  /*@ngInject*/
  function ApplicationController($scope, $pouchDB, $timeout) {
    var $ctrl = this;
    $ctrl.$onInit = onInit;

    /**
     * @function
     * @name onInit
     * @description A component's lifeCycle hook which is called after all the controllers on an element have been constructed and had their bindings initialized
     */
    function onInit() {
      $pouchDB.createDatabase();
      $scope.authFailed = false;
    }

    $scope.login = function() {
      console.log($scope.email);
      console.log($scope.password);
      var payload = {
        email: $scope.email,
        password: $scope.password
      }
      $pouchDB.checkUserCredentials(payload).then(function(res) {
        console.log(res);
      }).catch(function(error) {
        $scope.authFailed = true;
        $timeout(function(){
          $scope.authFailed = false;
        }, 3000)
      })
    }
  }
})();
