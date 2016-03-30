var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    argv = require('yargs').argv,
    cfg = require('../config');

gulp.task('requirejs', function() {
    rjs({
            baseUrl: cfg.src + 'app/',
            out: 'bootstrap.js',
            name: 'bootstrap',
            paths: {
                'domReady': '../vendor/requirejs-domready/domReady',
                'text': '../vendor/requirejs-text/text'
            },
            onBuildRead: function(moduleName, path, contents) {
                if(path.indexOf('app.config.module') > -1) {
                    contents = argv.release ? contents.replace(/\'ENV\'\s*\,[^)]+?\)/i, "'ENV' , 'release')") : argv.beta ? contents.replace(/\'ENV\'\s*\,[^)]+?\)/i, "'ENV' , 'beta')") : contents;
                }
                return contents
            }
        })
        .pipe(uglify())
        .pipe(gulp.dest(cfg.build + 'app/'))
});
