/**
 * Mock mixpanel
 */
var MixpanelMock = (function () {
  return function () {
    return {
      init: function () {
        return true;
      },
      track: function () {
        return true;
      }
    }
  }
})();

window.mixpanel = new MixpanelMock();