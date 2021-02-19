(function () {
  'use strict';

  angular
    .module('inventory.config')
    .factory('stateHandler', stateHandler);
  /*@ngInject*/
  function stateHandler($rootScope, $state) {
    return {
      initialize: initialize
    };

    function initialize() {
      $rootScope.$state = $state;
      
      var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
        
      });

      var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        var titleKey = 'title';

        // Set the page title key to the one configured in state or use default one
        if (toState.data.pageTitle) {
          titleKey = toState.data.pageTitle;
        }
      });


      var stateChangeError = $rootScope.$on('$stateChangeError', function () {
      });

      $rootScope.$on('$destroy', function () {
        if (angular.isDefined(stateChangeStart) && stateChangeStart !== null) {
          stateChangeStart();
        }
        if (angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null) {
          stateChangeSuccess();
        }

        if (angular.isDefined(stateChangeError) && stateChangeError !== null) {
          stateChangeError();
        }
      });
    }
  }
})();