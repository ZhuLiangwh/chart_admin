var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    filter = require('gulp-filter'),
    cfg = require('../config');

var src = cfg.src + 'scss/**/*.scss',
    htmlSrc = cfg.src + 'app/**/*.html',
    reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cfg.src + 'css/'))
        .pipe(filter('**/*.css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('watch', function() {
    gulp.watch(src, ['sass']);
});

gulp.task('sync', ['watch'], function() {
    browserSync({
        proxy: "http://localhost:8080/src/#/"
    });

    gulp.watch(htmlSrc).on('change', reload);
});
