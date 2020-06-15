const {src, watch, dest} = require('gulp');
const compiler = require('webpack');
const webpack = require('webpack-stream');

const basePath = require('./basePath');

var webpackConf = {
    mode: 'development',
    entry: basePath.js,
    output: {
        path: __dirname + '/' + basePath.dest,
        filename: "imgView.js",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                use: [{loader: 'babel-loader'}],
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};


function jsTranspile() {
    return src(basePath.js)
        .pipe(webpack( {
                ...webpackConf,
                mode:'development',
            }, compiler, function (err, status) {
                // err status
            })
        )
        .pipe(dest(basePath.dest));
}
function jsTranspileBuild() {
    return src(basePath.js)
        .pipe(webpack( {
                ...webpackConf,
                mode:'production',
            }, compiler, function (err, status) {
                // err status
            })
        )
        .pipe(dest(basePath.dest));
}

function jsWatch(cb) {
    watch('./src/**/*.js', {ignoreInitial: false}, jsTranspile);
    cb();
}


module.exports = {
    jsTranspile,
    jsTranspileBuild,
    jsWatch,
};
