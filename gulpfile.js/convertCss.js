const {src, watch, dest, series} = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});

const basePath = require('./basePath');


function lessTranspile() {
    return src(basePath.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(rename('imgView.css'))
        .pipe(sourcemaps.write())
        .pipe(dest(basePath.dest));
}

function lessTranspileBuild() {
    return src(`${basePath.dest}/*.css`)
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.basename += '.min'
        }))
        .pipe(dest(basePath.dest));
}

function lessWatch(cb) {
    watch('./src/**/*.less', {ignoreInitial: false}, lessTranspile);
    cb();
}

module.exports = {
    lessTranspile,
    lessTranspileBuild: series(lessTranspile, lessTranspileBuild),
    lessWatch,
};
