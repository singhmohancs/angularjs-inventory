/**
 * @ngdoc Config
 * @name inventory.LayoutStateConfig
 * @module inventory
 *
 * @description
 * set route configuration for default layout of application
 *
 */
(function () {
  'use strict';
  angular
    .module('inventory')
    .config(LayoutStateConfig);

  /**
   * inject dependecies
   */
  LayoutStateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  /**
   * LayoutStateConfig
   * LayoutStateConfig construct
  */
  function LayoutStateConfig($stateProvider) {


    $stateProvider.state('app', {
      abstract: true,
      views: {
        /*'navbar@': {
          templateUrl: 'app/layouts/navbar/navbar.html',
          controller: 'NavbarController',
          controllerAs: 'navbarCtrl'
        },*/
        '': {
          templateUrl: 'app/layouts/templates/layout-master.html'
        }
      }
    });
  }

})();
