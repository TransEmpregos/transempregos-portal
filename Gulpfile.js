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
    args = require('yargs').argv;


(function createGulpCacheDir() {
    var dir = path.resolve(__dirname, '.gulp-cache');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
})()

gulp.task('watch', ['transpile'], function() {
    var watcher = gulp.watch('public/js/**/*.js', ['transpile:front']);
    var watcher = gulp.watch('public/less/**/*.less', ['transpile:less']);
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

gulp.task("transpile", function() {
    var merged = new mergeStream();
    merged.add(transpileFront(), transpileBack(), transpileLess());
    return merged;
});

gulp.task("transpile:front", transpileFront);
gulp.task("transpile:back", transpileBack);
gulp.task("transpile:less", transpileLess);

function transpileLess() {
    var lessFileCache = new FileCache('.gulp-cache/.gulp-cache-less');
    return gulp.src(["public/less/**/*.less"])
        .pipe(lessFileCache.filter())
        .pipe(less())
        .pipe(lessFileCache.cache())
        .pipe(debug({ title: 'less' }))
        .pipe(gulp.dest("dist/public/css"));
}

function transpileBack() {
    var backFileCache = new FileCache('.gulp-cache/.gulp-cache-back');
    return gulp.src(["server/**/*.js"])
        .pipe(backFileCache.filter())
        .pipe(babel({
            presets: ['stage-3', 'es2015']
        }))
        .pipe(backFileCache.cache())
        .pipe(debug({ title: 'back' }))
        .pipe(gulp.dest("dist/server"));
}

function transpileFront() {
    var frontFileCache = new FileCache('.gulp-cache/.gulp-cache-front');
    return gulp.src(["public/js/**/*.js"])
        .pipe(frontFileCache.filter())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(frontFileCache.cache())
        .pipe(sourcemaps.write("."))
        .pipe(debug({ title: 'front' }))
        .pipe(gulp.dest("dist/public/js"));
};

gulp.task("default", ['transpile'])