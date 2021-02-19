/**
 * @ngdoc Directive
 * @name $spinner
 *
 * @module inventory.shared
 *
 * @description
 * its use to show loading spinner during api call.
 * can register multiple spinner using the name attr.
 *
 */
(function() {
  'use strict';
  angular
    .module('inventory.shared')
    .directive('spinner', spinner);

    function spinner() {
      var directive = {
        restrict: 'EA',
        scope: {
          name: '@?',
          show: '=?',
          text:'@?'
        },
        template: '<span class="loading" data-ng-show="show"></span><span class="loading-text" data-ng-show="text && show" data-ng-bind="text"></span>',
        controller: SpinnerController
      };

      return directive;

      /*@ngInject*/
      function SpinnerController($scope, SpinnerService) {
        // register should be true by default if not specified.
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        }
        // Declare a mini-API to hand off to our service so the service
        // doesn't have a direct reference to this directive's scope.
        var api = {
          name: $scope.name,
          show: function () {
            $scope.show = true;
          },
          hide: function () {
            $scope.show = false;
          },
          toggle: function () {
            $scope.show = !$scope.show;
          },
          active: $scope.show ? true : false
        };
        // Register this spinner with the spinner service.
        if ($scope.register) {
          SpinnerService._register(api);
        }
      }
    }
})();
