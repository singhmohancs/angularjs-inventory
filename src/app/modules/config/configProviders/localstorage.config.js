(function() {
    'use strict';

    angular
        .module('inventory.config')
        .config(localStorageConfig);

    localStorageConfig.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

    function localStorageConfig($localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('inventory-');
        $sessionStorageProvider.setKeyPrefix('inventory-');
    }
})();