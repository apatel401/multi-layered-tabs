const del = require('del');
const log = require('fancy-log');
const gulp = require('gulp');
const bump = require('gulp-bump');
const concat = require('gulp-concat');
const header = require('gulp-header');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const removeLogging = require("gulp-remove-logging");
const args = require('yargs').argv;
const merge = require('merge-stream');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

var banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.repository.url %>',
    ' */',
    ''
].join('\n');

/**
 * Internal task. Removes old build files.
 * 
 * @private
 * @returns Promise
 */
function _cleanDist() {
    return del(['dist', '.tmp']);
}

/**
 * Internal task. Removes old test files.
 * 
 * @private
 * @returns Promise
 */
function _cleanTest() {
    return del(['test/vendor', 'test/dependencies', '.tmp']);
}

/**
 * Internal task. Compiles JS into /dist and creates minified version
 * 
 * @private
 * @returns Stream
 */
function _compileLib() {
    return gulp.src([
            'src/js/**/*.js',
        ])
        .pipe(babel({
            presets: ['@babel/preset-react'],
        }))
        .pipe(removeLogging())
        .pipe(gulp.dest('.tmp/js'))
        .on('error', function (err) {
            log.error(err.toString());
        });
}

/**
 * Copies scss files to tmp for webpack compilation.
 * 
 * @private
 * @returns Stream
 */
function _copySass() {
    return gulp.src('src/css/*.scss')
        .pipe(gulp.dest('.tmp/css'));
}

function _distWebpack() {
    var pkg = require('./package.json'); // only load the package when we need it

    return gulp.src([
            '.tmp/js/app.js'
        ])
        .pipe(webpack(require('./webpack.config.dist.js')))
        .pipe(concat('bundle.min.dist.js')) // Output to this file
        .pipe(replace('%%%PACKAGE_NAME%%%', pkg.name))
        .pipe(replace('%%%PACKAGE_VERSION%%%', pkg.version))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'));
};

/**
 * Internal task. Updates versioning
 * 
 * @private
 * @returns Stream
 */
function _bump() {
    // Usage:
    // 1. gulp bump : bumps the package.json to the next minor revision.
    //   i.e. from 0.1.1 to 0.1.2
    // 2. gulp bump --exact 1.1.1 : bumps/sets the package.json to the 
    //    specified revision.
    // 3. gulp bump --type major       : bumps 1.0.0 
    //    gulp bump --type minor       : bumps 0.1.0
    //    gulp bump --type patch       : bumps 0.0.2
    //    gulp bump --type prerelease  : bumps 0.0.1-2

    var type = args.type || 'patch';
    var version = args.exact;
    var options = {};
    if (version) {
        options.version = version;
    } else {
        options.type = type;
    }
    
    return gulp
        .src(['./package.json', './package-lock.json'])
        .pipe(bump(options))
        .pipe(gulp.dest('./'));
}

/**
 * Internal task. Concats/Compiles React to /test/vendor for local development/testing
 * 
 * @private
 * @returns Stream
 */
function _jsDev() {
    return gulp.src([
            'src/**/*.js'
        ])
        .pipe(babel({
            presets: ['@babel/preset-react'],
        }))
        .pipe(gulp.dest('.tmp'));
}

// Copies development files to /test
function _devWebpack() {
    var pkg = require('./package.json'); // only load the package when we need it

    return gulp.src([
            '.tmp/js/app.js'
        ])
        .pipe(webpack(require('./webpack.config.test.js')))
        .pipe(concat('vendor.min.dev.js'))
        .pipe(replace('%%%PACKAGE_NAME%%%', pkg.name))
        .pipe(replace('%%%PACKAGE_VERSION%%%', pkg.version))
        .pipe(gulp.dest('test/vendor'));
}

/**
 * Internal task. Copies src images to .tmp/img for all builds
 * 
 * @private
 * @returns Stream
 */
function _copyImages() {
    return gulp.src('src/img/**/*', { base: 'src' })
        .pipe(gulp.dest('.tmp')); 
}

/**
 * Internal task. Copies development files to /test
 * 
 * @private
 * @returns Stream
 */
function _copyDevelopmentAssets() {
   /**
    * bootstrap 5 css needs to be added here
    */
   //  var _css = gulp.src('node_modules/k8-bootstrap-css/scss/tvo_k8.css')
   //      .pipe(gulp.dest('test/vendor')); 
    
    var _devAssets = gulp.src([
            'node_modules/development-assets/assets/**/*',
            'node_modules/development-assets/dependencies/**/*'
        ], { base: 'node_modules/development-assets' })
        .pipe(gulp.dest('test')); 
    
    return merge(_css, _devAssets);
}

/**
 * Public task. Runs a "test build" to /test, for local development/qa.
 * 
 * @public
 * @returns Stream
 */
const publishTest = gulp.series(
    _cleanTest,
    gulp.parallel(
        _copyImages,
        _copySass,
        _jsDev,
        _copyDevelopmentAssets
    ),
    _devWebpack
);
publishTest.description = 'Runs a "test build" to /test, for local development/qa';
exports.publishTest = publishTest;

/**
 * Internal task. Watches Sass and JS files to trigger compilation
 * 
 * @private
 * @returns Stream
 */
function _livereload() {
    gulp.watch('src/css/**/*.scss', gulp.series(_copySass,_devWebpack));
    gulp.watch('src/js/**/*.js', gulp.series(_jsDev, _devWebpack));
    gulp.watch('src/img/**/*', gulp.series(_copyImages, _devWebpack));
};

/**
 * Public task. Livereload/Watches Sass and JS files to trigger compilation.
 * 
 * @public
 * @returns Stream
 */
const dev = gulp.series(publishTest, _livereload);
dev.description = 'Livereload/Watches Sass and JS files to trigger compilation';
exports.dev = dev;

/**
 * Public task. Builds a production release to /dist.
 * 
 * "gulp" (default) will bump a patch release
 * Other options:
 *  "gulp --type minor"
 *  "gulp --type major"
 *  "gulp --exact #.#.#"
 * 
 * @public
 * @returns Stream
 */
const defaultBuild = gulp.series(
    gulp.parallel(
        _cleanDist,
        _bump
    ),
    gulp.parallel(
        _copyImages,
        _compileLib,
        _copySass
    ),
    _distWebpack
);
defaultBuild.description = 'Builds a production release to /dist';
exports.default = defaultBuild;