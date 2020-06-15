const {watch, series, parallel} = require('gulp');
const brwoserSync = require('browser-sync').create();

const {jsTranspile, jsWatch} = require('./convertJs');
const {lessTranspile, lessWatch} = require('./convertCss');
const basePath = require('./basePath');

const {reload} = brwoserSync;

function server(cb) {
    brwoserSync.init({
        // notify: false,
        port: 9090,
        startPath: 'demo/demo1.html',
        server: {
            baseDir: './'
        }
    });
    watch([`${basePath.dest}/**/*.js`, `$${basePath.dest}/**/*.css`], {ignoreInitial: false}, function (cb) {
        reload()
        cb();
    });
    cb();
}


module.exports = series(parallel(jsWatch, lessWatch), server);

