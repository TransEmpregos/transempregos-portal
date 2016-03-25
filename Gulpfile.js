var gulp = require("gulp"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    mergeStream = require('merge-stream'),
    debug = require("gulp-debug"),
    nodemon = require('gulp-nodemon'),
    FileCache = require("gulp-file-cache"),
    fs = require('fs'),
    path = require('path');


(function createGulpCacheDir() {
    var dir = path.resolve(__dirname, '.gulp-cache');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
})()

gulp.task('watch', ['transpile'], function() {
    var watcher = gulp.watch('public/**/*.js', ['transpile:front']);
    return nodemon({
        script: 'dist/server/bin/www.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' },
        watch: ['server'],
        tasks: ['transpile:back']
    })
});

gulp.task("transpile", function() {
    var merged = new mergeStream();
    merged.add(transpileFront(), transpileBack());
    return merged;
});

gulp.task("transpile:front", transpileFront);
gulp.task("transpile:back", transpileBack);

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
    return gulp.src(["public/**/*.js"])
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