'use strict';

// Requires
var gulp         = require('gulp');
var argv         = require('yargs').argv;
var sass         = require('gulp-sass');
var cache        = require('gulp-cached');
var gulpif       = require('gulp-if');
var uglify       = require('gulp-uglify');
var cssmin       = require('gulp-cssmin');
var imgmin       = require('gulp-imagemin');
var svgmin       = require('gulp-svgmin');
var remember     = require('gulp-remember');
var browserify   = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var cmq          = require('gulp-combine-media-queries');
var browserSync  = require('browser-sync');

// Globs
var source = {
      svg: ['public/assets/img/**/*.svg'],
      sass: ['public/assets/scss/**/*.scss'],
      html: ['public/app/**/*.html'],
      bower: ['public/assets/lib/'],
      images: ['public/assets/img/**/*.+(png|jpg|gif)'],
      scripts: ['public/app/app.js']
    },
    destination = {
      css: 'public/dist/css',
      images: 'public/dist/img',
      scripts: 'public/dist/js'
    };

// Initialize Browser Sync
gulp.task('browser-sync', function () {
  if(!argv.production) {
    browserSync({
      port: 3000,
      proxy: '127.0.0.1:1337'
    });
  }
});

// Compile sass
gulp.task('sass', function () {
  return gulp.src(source.sass)
    .pipe(cache('sass'))
      .pipe(sass({
        require: ['susy'],
        errLogToConsole: true
      }))
      .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      }))
      .pipe(cmq({log:true}))
      .pipe(gulpif(argv.production, cssmin()))
      .pipe(gulp.dest(destination.css))
      .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
    .pipe(remember('sass'));
});

// reload on html changes
gulp.task('html', function () {
  return gulp.src(source.html)
    .pipe(cache('html'))
      .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
    .pipe(remember('html'));
});

// Minify and package images and svg
gulp.task('images', function () {
  // Minify Images
  gulp.src(source.images)
    .pipe(imgmin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(destination.images))
    .pipe(gulpif(!argv.production, browserSync.reload({stream:true})));
  
  // Minify SVG
  gulp.src(source.svg)
    .pipe(svgmin([
      { removeDoctype: false },
      { removeComments: false },
      { removeHiddenElems: { circleR0: false } }
    ]))
    .pipe(gulp.dest(destination.images))
    .pipe(gulpif(!argv.production, browserSync.reload({ stream:true })));
});

// Uglify and concat all sciprts
gulp.task('scripts', function () {
  return gulp.src(source.scripts)
    .pipe(cache('scripts'))
      .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
      .pipe(gulpif(argv.production, uglify()))
      .pipe(gulpif(!argv.production, browserSync.reload({ stream:true, once: true })))
    .pipe(remember('scripts'))
    .pipe(gulp.dest(destination.scripts));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(source.sass, ['sass']);
  gulp.watch(source.bower, ['libs']);
  gulp.watch([source.svg, source.images], ['images']);
  gulp.watch(source.html, ['html']);
  gulp.watch(source.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'sass',
  'html',
  'images',
  'scripts',
  'browser-sync',
  'watch'
]);