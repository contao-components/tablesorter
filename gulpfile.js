const { src, dest, parallel } = require('gulp');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const svgo = require('gulp-svgo');

function css() {
    return src(['css/*.css', '!css/*.min.css'])
        .pipe(csso({
            comments: false,
            restructure: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('css'));
}

function svg() {
    return src('images/*.svg')
        .pipe(svgo({
            multipass: true,
            plugins: [{
                sortAttrs: true,
                inlineStyles: { onlyMatchedOnce: false }
            }]
        }))
        .pipe(dest('images'));
}

exports.default = parallel(css, svg);
