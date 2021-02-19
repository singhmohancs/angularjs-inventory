(function () {
  'use strict';

  angular
    .module('inventory.config')
    .config(httpConfig);
  /*@ngInject*/
  function httpConfig($httpProvider, httpRequestInterceptorCacheBusterProvider) {

    //enable CSRF
    $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

    //Cache everything except rest api requests
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);
    $httpProvider.interceptors.push('authExpiredInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.useApplyAsync(true);
  }
})();