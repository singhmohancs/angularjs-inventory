var child_process = require('child_process');
var fs = require('fs');
var env = require('node-env-file');

if (fs.existsSync(__dirname + '/.env')) {
  env(__dirname + '/.env');
  if (typeof(process.env.TYFY_ENV)!='undefined') {
    var current_env = process.env.TYFY_ENV;

    if (typeof(current_env)!='undefined' && current_env === 'local') {
      child_process.execSync('webdriver-manager update');
      return;
    }
  }
} else {
  console.error('No task for environment.');
}

process.exit(0);