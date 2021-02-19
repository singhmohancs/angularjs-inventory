(function () {
  'use strict';
  angular
    .module('inventory')
    .config(dashboardConfig);

  /*@ngInject*/
  function dashboardConfig($stateProvider) {
    $stateProvider.state({
      name: 'dashboard',
      parent: 'app',
      url: '/dashboard',
      data: {
        authorities: ['USER_ROLE']
      },
      params: {},
      views: {
        'content': {
          component: 'dashboard'
        }
      }
    });
  }
})();