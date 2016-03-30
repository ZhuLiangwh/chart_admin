var gulp = require('gulp'),
    del = require('del'),
    cfg = require('../config');

gulp.task('clean', function(cb) {
    del([cfg.build], cb)
});
