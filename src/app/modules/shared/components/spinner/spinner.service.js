/**
 * @ngdoc Service
 * @name $spinner
 *
 * @module inventory.shared
 *
 * @description
 * its use to hide/show loading spinner during api call.
 *
 */
(function () {
  'use strict';

  angular
    .module('inventory.shared')
    .service('SpinnerService', SpinnerService);
  
    function SpinnerService() {
    var spinners = {};
    return {
      _register: function (data) {
        if (!data.hasOwnProperty('name')) {
          throw new Error("Spinner must specify a name when registering with the spinner service.");
        }
        if (spinners.hasOwnProperty(data.name)) {
          this._unregister(data.name);
        }
        spinners[data.name] = data;
      },
      _unregister: function (name) {
        if (spinners.hasOwnProperty(name)) {
          delete spinners[name];
        }
      },
	    show: function (name) {
        var spinner = spinners[name];
        if (!_.isUndefined(spinner)) {
          spinner.active = true;
          spinner.show();
        }
      },
      hide: function (name) {
        var spinner = spinners[name];
        spinner.active = false;
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.hide();
      },
      isSpinnerActive: function(name) {
        if (_.keys(spinners).length) {
          var spinner = spinners[name];
          return (!_.isUndefined(spinner) ? spinner.active : false);
        }
        return false;
      }
    };
  }
})();
