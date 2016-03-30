var gulp = require('gulp'),
    cfg = require('../config');

var src = cfg.src,
    build = cfg.build;

/*==copy html==*/
gulp.task('copy:html', function() {
    return gulp.src([src + '*.html', src + 'app/**/*.html'], {
            base: src
        })
        .pipe(gulp.dest(build));
});

/*==copy css==*/
gulp.task('copy:css', function() {
    return gulp.src(src + 'css/**', {
            base: src
        })
        .pipe(gulp.dest(build));
});

/*==copy assets==*/
gulp.task('copy:assets', function() {
    return gulp.src(src + 'assets/**', {
            base: src
        })
        .pipe(gulp.dest(build));
});

/*==copy vendors==*/
gulp.task('copy:vendors', function() {
    var vendors = cfg.getVendors();

    return gulp.src(vendors, {
            base: src
        })
        .pipe(gulp.dest(build));
});

/*==copy boot==*/
gulp.task('copy:boot', function() {
    return gulp.src(src + 'boot.js')
        .pipe(gulp.dest(build));
});

gulp.task('copy', ['copy:html', 'copy:css', 'copy:assets', 'copy:vendors', 'copy:boot']);
