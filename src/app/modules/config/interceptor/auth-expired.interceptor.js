(function () {
  'use strict';

  angular
    .module('inventory.config')
    .factory('authExpiredInterceptor', authExpiredInterceptor);


  authExpiredInterceptor.$inject = ['$rootScope', '$q', '$injector', '$localStorage', '$sessionStorage'];

  function authExpiredInterceptor($rootScope, $q, $injector, $localStorage, $sessionStorage) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(response) {
      if (response.status === 401) {
        delete $localStorage.authenticationToken;
        delete $sessionStorage.authenticationToken;
        delete $localStorage.default_organization_Id;
      }
      return $q.reject(response);
    }
  }
})();