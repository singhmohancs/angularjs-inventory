(function () {
  'use strict';
  angular
    .module('inventory.account')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('legacySignUpRoot', {
      parent: 'account',
      url: '/signup',
      data: {
        authorities: [],
        pageTitle: 'signup.title'
      },
      views: {
        '': {
          component: 'signup'
        }
      },
      resolve: {
        authorize: ['Auth',
          function (Auth) {
            return Auth.authorize();
          }
        ]
      }
    }).state('legacySignUpWithParams', {
        parent: 'account',
        url: '/signup/:plan/:planLevel',
        data: {
          authorities: [],
          pageTitle: 'signup.title'
        },
        views: {
          '': {
            component: 'signup'
          }
        },
        resolve: {
          authorize: ['Auth',
            function (Auth) {
              return Auth.authorize();
            }
          ]
        }
      });
  }
})();