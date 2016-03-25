var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat"),
    mergeStream = require('merge-stream'),
    debug = require("gulp-debug")

gulp.task("default", function() {
    var merged = new mergeStream();
    merged.add(gulp.src(["server/**/*.js"])
        .pipe(babel({
            presets: ['stage-3', 'es2015']
        }))
        .pipe(debug())
        .pipe(gulp.dest("dist/server")));
    merged.add(gulp.src(["public/**/*.js"])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write("."))
        .pipe(debug())        
        .pipe(gulp.dest("dist/public")));
    return merged;
});