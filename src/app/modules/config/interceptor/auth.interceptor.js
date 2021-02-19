(function () {
  'use strict';

  angular
    .module('inventory.config')
    .factory('authInterceptor', authInterceptor);
  /*@ngInject*/
  function authInterceptor() {
    var service = {
      request: request
    };

    return service;

    function request(config) {
      return config;
    }
  }
})();
