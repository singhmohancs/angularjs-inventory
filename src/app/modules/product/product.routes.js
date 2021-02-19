(function () {
  'use strict';
  angular
    .module('inventory.product')
    .config(stateConfig);

   /*@ngInject*/
  function stateConfig($stateProvider) {
    $stateProvider.state( {
      parent: 'app',
      name: 'product',
      url: 'product',
      views: {
        'content' : {
          component: 'productList'
        }
      }
    });

    $stateProvider.state( {
      parent: 'app',
      name: 'product.list',
      url: '/list',
      views: {
        'content' : {
          component: 'productList'
        }
      }
    });

    $stateProvider.state( {
      parent: 'app',
      name: 'product.detail',
      url: '/list',
      views: {
        'content' : {
          component: 'productList'
        }
      }
    });


  }
})();