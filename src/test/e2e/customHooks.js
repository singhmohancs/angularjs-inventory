/**
 * Create custom hook
 */

'use strict';

(function () {
  by.addLocator('testHook', function (hook, optParentElement, optRootSelector) {
    var using = optParentElement || document.querySelector(optRootSelector) || document;
    return using.querySelector('[test-hook=\'' + hook + '\']');
  });

  by.addLocator('testHookAll', function (hook, optParentElement, optRootSelector) {
    var using = optParentElement || document.querySelector(optRootSelector) || document;
    return using.querySelectorAll('[test-hook=\'' + hook + '\']');
  });
})();