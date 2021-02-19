/**
 * @ngdoc overview
 * @name inventory.appInitializer
 *
 * @module inventory
 *
 * @description
 * This is very first module which is mounted at very first
 * This module get the configuration from server before application get bootstrap
 * Store configurations in constant service to be used in application
 *
 */
(function () {
  'use strict';
  angular.module('inventory.envConfig', []);
  angular
    .module('inventory.appInitializer', ['inventory.envConfig'])
    .run(run);
  /**
   * @inject
   * inject dependencies
   */
  run.$inject = ['$http'];
  function run($http) {
    //angular.module('inventory.config').constant('CONFIG', {});
    angular.bootstrap(document, ['inventory']);
    /**
     * Bootstrap application asyn
     * @name inventory
     * @namespace inventory
    $http.get(ENV_CONFIG.API_HOST + '/utils/config').then(function (data) {
      var constants = data.data;
      constants.API_HOST = ENV_CONFIG.API_HOST;
      angular.module('inventory.config').constant('CONFIG', data.data);
      angular.bootstrap(document, ['inventory']);
    });
    */

  }
  /**
   * Bootstrap appInitializer
   * @name inventory
   * @namespace inventory
   */
  angular.element(document).ready(function () {
    //angular.bootstrap(document, ['inventory']);
    angular.bootstrap(document.getElementById('appConfig'), ['inventory.appInitializer'], {
      strictDi: true
    });
  });
})();