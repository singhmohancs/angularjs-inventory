(function () {
  'use strict';

  angular
    .module('inventory')
    .config(stateConfig);

 /*@ngInject*/
  function stateConfig($stateProvider) {
    $stateProvider
      .state('error', {
        parent: 'app',
        url: '/error',
        data: {
          authorities: [],
          pageTitle: 'error.title'
        },
        views: {
          'content': {
            templateUrl: 'app/modules/error/error.html'
          }
        }
      })
      .state('accessdenied', {
        parent: 'app',
        url: '/accessdenied',
        data: {
          authorities: []
        },
        views: {
          '': {
            templateUrl: 'app/modules/error/accessdenied.html'
          }
        }
      }) .state('maintenance', {
        url: '/maintenance',
        data: {
          authorities: []
        },
        views: {
          '': {
            templateUrl: 'app/modules/error/maintenance.html'
          }
        }
      }).state('notfound', {
        parent: 'app',
        url: '/notfound',
        data: {
          authorities: []
        },
        views: {
          'content': {
            templateUrl: 'app/modules/error/notfound.html'
          }
        }
      });
  }
})();
