const {series} = require('gulp');
const del = require('del');

const runDev = require('./dev');
const runBuild = require('./build');
const basePath = require('./basePath');

function clean() {
    return del(basePath.dest)
}

function defaultTask(cb) {
    cb();
}

module.exports = {
    default: defaultTask,
    dev: series(clean, runDev),
    build: series(clean, runBuild),
}


