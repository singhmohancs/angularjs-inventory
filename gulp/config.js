module.exports = {
  app: 'src/app/',
  public: 'src/public/',
  tmp_public: 'src/.tmp/public/',
  resources: 'src/resources/',
  dist: 'target/www/',
  test: 'src/test/',
  scss: 'src/app/layouts/scss',
  sassSrc: ['src/app/layouts/scss/app.scss'],
  sassVendor: 'src/app/layouts/scss/bootstrap.scss',
  cssDir: 'src/public/assets/css/',
  bower: 'bower_components/',
  tmp: 'target/tmp',
  revManifest: 'target/tmp/rev-manifest.json',
  port: 9000,
  apiPort: 8080,
  liveReloadPort: 35729,
  uri: 'http://localhost:',
  constantTemplate:
  '/**\n' +
  ' * @ngdoc overview\n' +
  ' * @name inventory\n' +
  ' *\n' +
  ' * @module inventory\n' +
  ' *\n' +
  ' * @description\n' +
  ' * Application constants created by gulp task\n' +
  ' *\n' +
  ' * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )\n' +
  ' */\n' +
  '(function () {\n' +
  '  \'use strict\';\n' +
  '  angular\n' +
  '    .module(\'<%- moduleName %>\')\n' +
  '<% constants.forEach(function(constant) { %>    .constant(\'<%- constant.name %>\', <%= constant.value %>)\n<% }) %>;\n' +
  '})();\n'
};