'use strict';

var gulp = require('gulp'),
    csso = require('gulp-csso'),
    ignore = require('gulp-ignore'),
    rename = require('gulp-rename'),
    svgo = require('gulp-svgo'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

gulp.task('minify-css', function (cb) {
    pump([
            gulp.src('css/*.css'),
            ignore.exclude('*.min.css'),
            csso({
                comments: false,
                restructure: false
            }),
            rename({
                suffix: '.min'
            }),
            gulp.dest('css')
        ],
        cb
    );
});

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('js/*.js'),
            ignore.exclude('*.min.js'),
            uglify(),
            rename({
                suffix: '.min'
            }),
            gulp.dest('js')
        ],
        cb
    );
});

gulp.task('minify-images', function (cb) {
    pump([
            gulp.src('images/*.svg'),
            svgo(),
            gulp.dest('images')
        ],
        cb
    );
});

gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'minify-images'));
