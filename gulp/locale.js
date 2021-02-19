const { getProcessParams } = require('./utils');
const localesBasePath = './src/resources/i18n';
const localesDirs = ['es', 'nl', 'pt-br', 'pt', 'vi', 'zh', 'ja', 'fr', 'de']; // @TODO - make a global vanilla javascript list that will be used in gulp and angular constant service
const { compareFiles, createDirectory, updateFiles } = require('deep-compare-json');


const config = {
  basePath: localesBasePath,
  compareWith: localesDirs,
  key_placeholder: 'VALUE_FOR_KEY_MISSING',
  debugLog: false,
  defaultDir: 'en'
};

const compare = (callback) => {
  compareFiles(config)
    .then(response => {
      let hasMissingKeys = false;
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const missingKyes = response[key];
          if (missingKyes.length > 0) {
            hasMissingKeys = true;
            break;
          }
        }
      }
      if (hasMissingKeys) {
        callback(`Error found while found missing Keys - ${JSON.stringify(response, null, 2)}`);
      } else {
        console.info('Success - locale compare test are passed.')
        callback(0);
      }
    });
}


const update = () => {
  updateFiles(config)
    .then(response => {
      console.log(response);
    });
}

const create = () => {
  const params = getProcessParams();
  const directoryName = params.name;
  if (directoryName) {
    createDirectory(config)(directoryName);
  }
}

module.exports = {
  compare,
  update,
  create
}