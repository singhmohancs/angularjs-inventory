(function () {
  'use strict';

  angular
    .module('inventory.account')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('account', {
      abstract: true,
      template: '<ui-view></ui-view>'
    });
  }
})();