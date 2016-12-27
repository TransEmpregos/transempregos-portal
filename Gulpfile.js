"use strict";
const gulp = require("gulp"),
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
    // ts = require("gulp-typescript"), //todo: using exec until https://github.com/ivogabe/gulp-typescript/issues/460 is resolved
    exec = require('child_process').exec,
    browserSync = require('browser-sync'),
    intoStream = require('into-stream');
const { protractor, webdriver_standalone, webdriver_update } = require("gulp-protractor");

(function createGulpCacheDir() {
    var dir = path.resolve(__dirname, '.gulp-cache');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
})();

gulp.task('watch:front', ['transpile:front'], () => {
    gulp.watch('public/**/*.ts', ['transpile:front']);
    gulp.watch('public/**/*.less', ['transpile:less']);
    gulp.watch('public/**/*.html', ['copy:html']);
});

gulp.task('watch', ['transpile'], () => {
    gulp.watch('public/**/*.ts', ['transpile:front']);
    gulp.watch('public/**/*.less', ['transpile:less']);
    gulp.watch('public/**/*.html', ['copy:html']);
    gulp.watch('test/**/*.ts', ['transpile:back']);
    let nodemonOpt = {
        exec: "node --debug --harmony-async-await",
        script: 'dist/server/bin/www.js',
        ext: 'ts',
        env: {
            'NODE_ENV': 'development',
            'DEBUG': '*'
        },
        watch: ['server/**/*.ts'],
        tasks: ['transpile:back'],
    };
    var stream = nodemon(nodemonOpt);
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: 'dist/public/**/*',
        browser: 'chrome',
        port: 7000
    });
    stream.on('start', () => {
        browserSync.reload();
    });
    return stream;
});

gulp.task('copy', ['copy:html']);

gulp.task("copy:html", () => {
    var htmlFileCache = new FileCache('.gulp-cache/.gulp-cache-html');
    return gulp.src(["public/**/*.html"])
        .pipe(plumber())
        .pipe(htmlFileCache.filter())
        .pipe(htmlFileCache.cache())
        .pipe(debug({ title: 'html' }))
        .pipe(gulp.dest("dist/public"));
});

gulp.task("transpile", () => {
    var merged = new mergeStream();
    merged.add(transpileFront(), transpileBack(), transpileLess());
    return merged;
});

gulp.task("transpile:front", transpileFront);
gulp.task("transpile:back", transpileBack);
gulp.task("transpile:less", transpileLess);

gulp.task("test:front", (done) => {
    new karmaServer({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        singleRun: true
    }, done).start();
});

gulp.task("autotest", () => {
    gulp.watch('public/**/*.js', ['transpile:front']);
    gulp.watch(["server/**/*.js", "test/**/*.js"], ['transpile:back']);
    gulp.watch(["dist/server/**/*.js", "dist/test/**/*.spec.js"], ['test:back']);
    new karmaServer({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        singleRun: false
    }).start();
});

gulp.task("test:back", () => {
    return gulp.src('dist/test/**/*.spec.js', { read: false })
        .pipe(mocha({ reporter: 'spec', require: ['./dist/test/_specHelper.js'] }));
});

gulp.task("test:acceptance:setup", webdriver_update);

gulp.task("test:acceptance", ["test:acceptance:setup"], () => {
    gulp.src(["./dist/test/**/*.feature.js"])
        .pipe(protractor({
            configFile: "dist/test/protractor.config.js",
            //args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', (e) => { throw e; })
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

// const tsProjectBack = ts.createProject("tsconfig.json");
function transpileBack() {
    //todo: using exec until https://github.com/ivogabe/gulp-typescript/issues/460 is resolved
    const promise = new Promise((resolve, reject) => {
        exec(`tsc --pretty --project ${__dirname}`, {
            cwd: __dirname,
        }, (err, stdout, stderr) => {
            let info = "";
            if (stdout)
                info += stdout;
            if (stderr)
                info += stderr;
            if (err) return reject(info + "\n" + err);
            resolve(info);
        })
    });
    return intoStream(promise);
    // return tsProjectBack.src()
    //     .pipe(sourcemaps.init())
    //     .pipe(plumber())
    //     .pipe(debug({ title: 'back' }))
    //     .pipe(tsProjectBack()).js
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(debug({ title: 'map' }))
    //     .pipe(gulp.dest("dist"));
}

// const tsProjectFront = ts.createProject("public/tsconfig.json");
function transpileFront() {
    //todo: using exec until https://github.com/ivogabe/gulp-typescript/issues/460 is resolved
    const publicPath = path.resolve(__dirname, 'public');
    const promise = new Promise((resolve, reject) => {
        exec(`tsc --pretty --project ${publicPath}`, {
            cwd: publicPath,
        }, (err, stdout, stderr) => {
            let info = "";
            if (stdout)
                info += stdout;
            if (stderr)
                info += stderr;
            if (err) return reject(info + "\n" + err);
            resolve(info);
        })
    });
    return intoStream(promise);
    // return tsProjectFront.src()
    //     .pipe(sourcemaps.init())
    //     .pipe(plumber())
    //     .pipe(debug({ title: 'front' }))
    //     .pipe(tsProjectFront()).js
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest("dist/public"));
};

gulp.task("default", ['transpile'])