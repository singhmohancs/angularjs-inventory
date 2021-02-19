(function () {
  'use strict';

  angular
    .module('inventory.core', [
      /**
       * @module LocalStrorage
       *
       * @description
       * This module contails all feature of local storage which are easy to use and short in syntax
       */
      'ngStorage',
      
      /**
       * @module ngResource
       *
       * @description
       * The ngResource module provides interaction support with RESTful services via the $resource service.
       */
      'ngResource',
      /**
       * @module ngMessages
       *
       * @description
       * The ngMessages module provides enhanced support for displaying messages
       */
      'ngMessages',
      /**
       * @module ui.router
       *
       * @description
       * AngularUI Router is a routing framework, which implements flexible routing with nested views in AngularJS.
       */
      'ui.router',
      /**
       * @module ngCookies
       *
       * @description
       * JavaScript plain cookies
       */
      'ngCookies',
      
      /**
       * @module ngAria
       *
       * @description
       * The ngAria module provides support for common ARIA attributes that convey state or
       * semantic information about the application for users of assistive technologies, such as screen readers.
       */
      'ngAria',
      /**
       * @module ui.bootstrap
       *
       * @description
       * Twitter bootstrap ui componenets
       */
      'ui.bootstrap',
      
      /**
       * @module ngCacheBuster
       *
       * @description
       * For http request caching
       */
      'ngCacheBuster',
      /**
       * @module ngSanitize
       *
       * @description
       * The ngSanitize module provides functionality to sanitize HTML.
       */
      'ngSanitize',
      'ngAnimate'
    ]);
})();
