const {parallel} = require('gulp');

const {jsTranspileBuild} = require('./convertJs');
const {lessTranspileBuild} = require('./convertCss');
const basePath = require('./basePath');

module.exports = parallel(jsTranspileBuild, lessTranspileBuild);

