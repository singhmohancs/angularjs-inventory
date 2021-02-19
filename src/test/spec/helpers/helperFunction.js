function findIn(element, selector) {
  return angular.element(element[0].querySelector(selector));
}

beforeAll(function () {
  angular.module('inventory.config').constant('CONFIG', { "APP_DEBUG": true, "ENV_API_DICTIONARY": "APP_DEBUG,ENV_API_DICTIONARY,APP_ENV,MARKETING_URL,AWS_BUCKET,S3_PUBLIC_BASE_URL,PUBNUB_ENABLED,PUBNUB_PUBLISH_KEY,RECURLY_PUBLICKEY,RECURLY_CURRENCY,RECURLY_DEFAULT_PLAN,OFFICE365_CLIENT", "APP_ENV": "dev", "MARKETING_URL": "https:\/\/inventory.com\/", "AWS_BUCKET": "assets.dev.inventory.com", "S3_PUBLIC_BASE_URL": "http:\/\/assets.dev.inventory.com", "PUBNUB_ENABLED": "1", "PUBNUB_PUBLISH_KEY": "pub-c-434f75bc-7e71-4e77-bbd1-9f1e4defeb04", "RECURLY_PUBLICKEY": "sjc-iU8nEcsuNchPAj1xKdoyfz", "RECURLY_CURRENCY": "USD", "RECURLY_DEFAULT_PLAN": "pro-monthly", "OFFICE365_CLIENT": "6a27d531-e74a-4d8e-be08-65adeef071b2" });
});

beforeEach(mockAppInitializer);