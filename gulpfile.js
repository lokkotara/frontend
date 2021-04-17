"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");

function scss2css() {
  return gulp
    .src("./www/scss/main.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./www/"));
}

function autoUpdate() {
  browserSync.init({
    server: {
      baseDir: "./www",
    },
  });
  gulp.watch("./www/scss/elements/*.scss", scss2css);
  gulp.watch("./www/scss/*.scss", scss2css);
  gulp.watch("./www/").on("change", browserSync.reload);
}

exports.scss2css = scss2css;
exports.watch = autoUpdate;
