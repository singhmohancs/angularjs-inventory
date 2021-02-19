(function () {
    'use strict';
    angular
        .module('inventory.account')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('legacyLoginRoot', {
            parent: 'account',
            url: '/login',
            data: {
                authorities: [],
                pageTitle: 'login.title'
            },
            views: {
                '': {
                    component: 'login'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        console.log("hello");
                        return Auth.authorize();
                    }
                ]
            }
        })
    }
})();