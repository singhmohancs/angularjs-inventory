/**
 * @ngdoc Component
 * @name inventory.account.component.signup
 * @module inventory.account
 *
 * @description
 * A component to signup new account
 *
 */
(function () {
  'use strict';

  angular
    .module('inventory.account')
    .component('signup', {
      template: '',
      controller:
        /*@ngInject*/
        function () {
          var $ctrl = this;

          /**
           * component's lifeCycle hooks
           */
          $ctrl.$onInit = initialization;
          $ctrl.$onDestroy = onDestroy;
          $ctrl.$onChanges = onChanges;

          /**
           * @function
           * @name initialization
           * @description
           * A component's lifeCycle hook which is called after all the controllers on an element have been constructed and had their bindings initialized
           */
          function initialization() {}

          /**
           * @function
           * @name onChanges
           * @description
           * A component's lifeCycle hook which is called when bindings are updated.
           */
          function onChanges() { }

          /**
           * @function
           * @name onDestroy
           * @description
           * A component's lifeCycle hook which is called when is called on a controller when its containing scope is destroyed.
           * Usefull to release external resources, watches and event handlers.
           */
          function onDestroy() { }
        }
    });
})();