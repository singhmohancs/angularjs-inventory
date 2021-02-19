/**
 * @ngdoc overview
 * @name inventory
 *
 * @module inventory
 *
 * @description
 * Main module of inventory application
 *
 */
(function () {
  'use strict';
  angular.module('inventory', [
    /*
     * Order is not important. Angular makes a
     * pass to register all of the modules listed
     */
    /*
     * Everybody has access to these.
     * We could place these under every feature area,
     * but this is easier to maintain.
     */
    'inventory.config',
    'inventory.core',
    'inventory.shared'
  ]).config(appConfigFn)
    .run(run)
    .service('_', function(){
      
    });
  /*@ngInject*/
  function appConfigFn() {
    //config block
  }

  /**
   * @inject
   * inject dependencies
   */
  /*@ngInject*/
  function run($templateCache) {
    
  }
})();