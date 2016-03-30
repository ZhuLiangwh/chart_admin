var gulp = require('gulp'),
    sequence = require('run-sequence');

gulp.task('build', function() {
    sequence('clean', 'requirejs', 'sass', 'copy');
});
