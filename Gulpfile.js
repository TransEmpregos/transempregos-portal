"use strict";
var gulp = require("gulp"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    mergeStream = require('merge-stream'),
    debug = require("gulp-debug"),
    nodemon = require('gulp-nodemon'),
    FileCache = require("gulp-file-cache"),
    less = require('gulp-less'),
    fs = require('fs'),
    path = require('path'),
    args = require('yargs').argv,
    plumber = require('gulp-plumber'),
    karmaServer = require('karma').Server,
    mocha = require('gulp-mocha'),
    protractor = require("gulp-protractor").protractor;

(function createGulpCacheDir() {
    var dir = path.resolve(__dirname, '.gulp-cache');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
})()

gulp.task('watch', ['transpile'], function () {
    gulp.watch('public/**/*.js', ['transpile:front']);
    gulp.watch('public/**/*.less', ['transpile:less']);
    let nodemonOpt = {
        script: 'dist/server/bin/www.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development',
            'DEBUG': '*,-babel'
        },
        watch: ['server'],
        tasks: ['transpile:back'],
    };
    if (args.debug) {
        let nodeDebugBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'node-debug');
        nodemonOpt.exec = nodeDebugBinPath;
        nodemonOpt.env.DEBUG = '*,-babel';
    }
    return nodemon(nodemonOpt);
});

gulp.task("transpile", function () {
    var merged = new mergeStream();
    merged.add(transpileFront(), transpileBack(), transpileLess());
    return merged;
});

gulp.task("transpile:front", transpileFront);
gulp.task("transpile:back", transpileBack);
gulp.task("transpile:less", transpileLess);

gulp.task("test:front", function (done) {
    new karmaServer({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        singleRun: true
    }, done).start();
});

gulp.task("autotest", function () {
    gulp.watch('public/**/*.js', ['transpile:front']);
    gulp.watch(["server/**/*.js", "test/**/*.js"], ['transpile:back']);
    gulp.watch(["dist/server/**/*.js", "dist/test/**/*.spec.js"], ['test:back']);
    new karmaServer({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        singleRun: false
    }).start();
});

gulp.task("test:back", function () {
    return gulp.src('dist/test/**/*.spec.js', { read: false })
        .pipe(mocha({ reporter: 'spec', require: ['./dist/test/_specHelper.js'] }));
});

gulp.task("test:acceptance", function () {
    gulp.src(["./test/**/*.feature.js"])
        .pipe(protractor({
            configFile: "test/protractor.config.js",
            //args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function (e) { throw e })
});

gulp.task("test", ["test:back", "test:front", "test:acceptance"]);

function transpileLess() {
    var lessFileCache = new FileCache('.gulp-cache/.gulp-cache-less');
    return gulp.src(["public/**/*.less"])
        .pipe(plumber())
        .pipe(lessFileCache.filter())
        .pipe(less())
        .pipe(lessFileCache.cache())
        .pipe(debug({ title: 'less' }))
        .pipe(gulp.dest("dist/public"));
}

function transpileBack() {
    var backFileCache = new FileCache('.gulp-cache/.gulp-cache-back');
    return gulp.src(["server/**/*.js", "test/**/*.js"], { base: './' })
        .pipe(plumber())
        .pipe(backFileCache.filter())
        .pipe(babel({
            presets: ['stage-3', 'es2015']
        }))
        .pipe(backFileCache.cache())
        .pipe(debug({ title: 'back' }))
        .pipe(gulp.dest("dist"));
}

function transpileFront() {
    var frontFileCache = new FileCache('.gulp-cache/.gulp-cache-front');
    return gulp.src(["public/**/*.js"])
        .pipe(plumber())
        .pipe(frontFileCache.filter())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(frontFileCache.cache())
        .pipe(sourcemaps.write("."))
        .pipe(debug({ title: 'front' }))
        .pipe(gulp.dest("dist/public"));
};

gulp.task("default", ['transpile'])