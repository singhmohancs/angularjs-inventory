/**
 * @ngdoc Component
 * @name inventory.component.dashboard
 * @module inventory.dashboard
 *
 * @description A component to manage org dashboard
 *
 */
(function () {
  'use strict';

  angular
    .module('inventory')
    .component('dashboard', {
      templateUrl: 'app/modules/dashboard/dashboard.html',
      controller:
        /*@ngInject*/
        function () {
          var $ctrl = this;

          /**
           * Component's lifeCycle hooks
           */
          $ctrl.$onInit = onInit;
          $ctrl.$onDestroy = onDestroy;
          $ctrl.$onChanges = onChanges;
          
          /**
           * Expose bindable methods these methods are accessible in view
           */

          /**
           * @function
           * @name onInit
           * @description A component's lifeCycle hook which is called after all the controllers on an element have been constructed and had their bindings initialized
           */
          function onInit() {
           
          }

          /**
           * @function
           * @name onChanges
           * @description A component's lifeCycle hook which is called when bindings are updated.
           */
          function onChanges() {}

          /**
           * @function
           * @name onDestroy
           * @description A component's lifeCycle hook which is called when is called on a controller when its containing scope is destroyed. 
           * Usefull to release external resources, watches and event handlers.
           */
          function onDestroy() {
          }
          
        }
    });
})();
