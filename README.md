# Angular Js test Project

## Development

Before you can build this project, you must install and configure your machine.

We use [Node.js](https://nodejs.org) to run a development web server and build the project. Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools (like
[Bower](https://bower.io) and [BrowserSync](https://www.browsersync.io]). You will only need to run this command when dependencies change in package.json.

    npm install
    
For non OS X users
    
    npm install --no-optional

We use [Bower](https://bower.io) for our third-party client libraries. Install the Bower-controlled apps with:

    bower install

We use [Gulp](http://gulpjs.com) as our build system. Install the Gulp command-line tool globally with:

    npm install -g gulp

Run the following command terminal to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    gulp
    
Run following command to inject vendors if needed
    
    gulp inject:vendor

Bower is used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in `bower.json`. You can also run `bower update` and `bower install` to manage dependencies.
Add the `-h` flag on any command to see how you can use it. For example, `bower update -h`.

## Configuring environment

Copy the example configuration file to `.env`:

    cp .env.example .env

Then edit that file to contain the URL of the API instance you wish to use.

## Building (and serving) for development
    gulp serve

## Building for production
    gulp build

## Testing

Unit tests are run by [Karma](http://karma-runner.github.io/) and written with [Jasmine](http://jasmine.github.io/2.0/introduction.html). 

    gulp test
    
More details on unit testing here: https://github.com/inventory/client/wiki/Unit-Tests-(Karma---Jasmine)

## E2E (End-to-End) tests
```bash
npm install --TYFY_ENV='local'

gulp itest

or 

gulp itest --suite = account

where `account` is suite name. Test Suites can be configured in `protractor.config.js`
```

## Locale/Translations

1. Test/compare locale files - compares locale `directory` with `en` default locale directory and check if there are missing keys. Below command will report all missing keys in terminal.
```bash

gulp locale:test

```

Note - This task is recommended to execute before you push any change.


2. Update missing keys. Below command will add missing keys in locale file with key value - `VALUE_FOR_KEY_MISSING`

```bash

gulp locale:update

```

3. Create new locale directory that will clone files from default locale directory `en` and update value of each key to `VALUE_FOR_KEY_MISSING`

```bash

gulp locale:create --name="en1"

```

Also, need to add newly created locale in `src/app/components/language/language.constants.js` file. 
```javascript
    .constant('TFY_LOCALE', {
      locales: ['en', 'es','nl','pt','vi','zh','en1'],
      mapping: {
        'en-*': 'en',
        'es-*': 'es',
        'nl-*': 'nl',
        'pt-*': 'pt',
        'zh-*': 'zh',
        'en1-*': 'en1'
      }
    })
```

4. add language to `locale compare script`
    - go to `gulp/locale.js`
    - go to line number 3 - `const localesDirs = ['es', 'nl', 'pt-br', 'pt', 'vi', 'zh'];`
    - add language key in an array `const localesDirs = ['es', 'nl', 'pt-br', 'pt', 'vi', 'zh', 'en1'];`

### File & directories:
- File `/src/test/protractor.config.js`. All protractor, jasmine2 and testcases configurations.
- `/src/test/e2e` : Test suites and helper files 
- Write commonly used helper function in `/src/test/e2e/helper.js`
- Write custom hook in `/src/test/e2e/customHooks.js`
- Write custom hook in `/src/test/e2e/customHooks.js`

### References & Guielines:
- E2E StyleGuide [http://www.protractortest.org/#/style-guide](http://www.protractortest.org/#/style-guide)
- Protractor configurations [https://github.com/angular/protractor/blob/master/lib/config.ts](https://github.com/angular/protractor/blob/master/lib/config.ts)

- APIs [http://www.protractortest.org/#/api](http://www.protractortest.org/#/api)

- Jasmine 2 [https://jasmine.github.io/2.0/introduction.html](https://jasmine.github.io/2.0/introduction.html)



## Continuous Integration

* Post-build Actions
    * Publish Test Report XML: build/reports/e2e/*.xml`

[Node.js]: https://nodejs.org/
[Bower]: http://bower.io/
[Gulp]: http://gulpjs.com/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/


# Known Issues
 - When update to latest Node version 
 > Node Sass does not yet support your current environment (macOS 10.12.1, Node 7.0.0)

 ### Solution: 
 > npm cache clean --force
 > npm rebuild node-sass

 - Quill does not contains dist files when installed with Bower ?
   ```bash
   bower install quill=https://github.com/quilljs/quill/releases/download/v1.3.5/quill.tar.gz --save
   ```

# language codes
http://can-translate.appspot.com/languages.js