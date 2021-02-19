gulp.task('copy', function () {
  return es.merge(
    gulp.src(config.app + 'resources/i18n/**')
      .pipe(plumber({ errorHandler: handleErrors }))
      .pipe(changed(config.dist + 'resources/i18n/'))
      .pipe(gulp.dest(config.dist + 'resources/i18n/')),

    gulp.src([config.public + 'assets/**/*'], {
      base: config.public + 'assets/'
    })
      .pipe(plumber({ errorHandler: handleErrors }))
      .pipe(changed(config.dist + 'public/assets'))
      .pipe(gulp.dest(config.dist + 'public/assets')),
    gulp.src(config.app + 'assets/**/*.{woff,woff2,svg,ttf,eot,otf}')
      .pipe(plumber({ errorHandler: handleErrors }))
      .pipe(changed(config.dist + 'assets/fonts/'))
      .pipe(flatten())
      .pipe(rev())
      .pipe(gulp.dest(config.dist + 'assets/fonts/'))
      .pipe(rev.manifest(config.revManifest, {
        base: config.dist,
        merge: true
      }))
      .pipe(gulp.dest(config.dist)),
    gulp.src([
      config.public + 'robots.txt',
      config.public + 'favicon.ico',
      config.public + '.htaccess',
      config.public + 'manifest.json'
    ], { dot: true })
      .pipe(plumber({ errorHandler: handleErrors }))
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist))
  );
});