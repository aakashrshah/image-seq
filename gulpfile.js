var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var babelify = require("babelify");

// gulp.task("bundle", function () {
//     return browserify({
//         entries: "./app/main.jsx",
//         debug: true
//     }).transform('reactify')
//         .bundle()
//         .pipe(source("main.js"))
//         .pipe(gulp.dest("app/dist"))
// });

gulp.task('react', function () {
  browserify('app/main.jsx')
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('app/dist'));
});

gulp.task("build", ["react"], function () {
    return gulp.src(["app/index.html","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task("default",["build"],function(){
   console.log("Gulp completed..."); 
});
