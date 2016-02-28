'use strict';

// Requires
var gulp       = require('gulp');

// Include plugins
var gulpsync   = require('gulp-sync')(gulp); // To do all these tasks in bulk
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// var clean      = require('gulp-clean'); // Clean

// Paths
var source     = 'src/';
var build      = 'dist/';
var jsdir      = 'js/';

var project    = 'ObfusCrypto';

// "_js" = concat
gulp.task('_js', function() {
    return gulp.src(source + jsdir + '*.js')
        .pipe(concat(project.toLocaleLowerCase() + '.js'))
        .pipe(gulp.dest(build + jsdir));
});

// "js" = uglify + concat
gulp.task('js', function() {
    return gulp.src(source + jsdir + '*.js')
        .pipe(uglify())
        .pipe(concat(project.toLocaleLowerCase() + '.js'))
        .pipe(gulp.dest(build + jsdir));
});

// ========================================
// Main tasks

// "watch" = Automatically build on file change
gulp.task('watch', function () {
    gulp.watch(source + jsdir + '*.js', ['_js']);
});

// "dist" = Make a distribution (build)
gulp.task('dist', gulpsync.sync(['clean-dist', 'js']));

// "build" = Make a simple build without optimizations
gulp.task('build', gulpsync.sync(['_js']));
// Default task
gulp.task('default', ['build']);
