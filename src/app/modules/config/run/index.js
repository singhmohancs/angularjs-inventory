/**
 * @ngdoc Run
 * @name inventory.config
 *
 * @module inventory.config
 *
 * @description
 * Initialise application states
 *
 */
(function () {
  'use strict';

  angular
    .module('inventory.config')
    .run(run);
  run.$inject = ['$rootScope', 'stateHandler', '$uibModalStack', '$state'];

  function run($rootScope, stateHandler) {
    stateHandler.initialize();
  }

})();