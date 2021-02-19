(function () {
  'use strict';
  angular
    .module('inventory')
    .config(stateConfig);

   /*@ngInject*/
  function stateConfig($stateProvider) {
    $stateProvider.state( {
      parent: 'app',
      name: 'home',
      url: '/home',
      views: {
        'content' : {
          component: 'home'
        }
      }
      
    });
  }
})();