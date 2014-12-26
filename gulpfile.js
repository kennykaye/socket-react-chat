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
var rename       = require('gulp-rename');
var remember     = require('gulp-remember');
var reactify     = require('reactify');
var browserify   = require('browserify');
var autoprefixer = require('gulp-autoprefixer');
var transform    = require('vinyl-transform');
var cmq          = require('gulp-combine-media-queries');
// var browserSync  = require('browser-sync');

// Globs
var source = {
      svg: ['public/assets/img/**/*.svg'],
      sass: ['public/assets/scss/**/*.scss'],
      images: ['public/assets/img/**/*.+(png|jpg|gif)'],
      scripts: ['public/assets/js/**/*.js']
    },
    destination = {
      css: 'public/dist/css',
      images: 'public/dist/img',
      scripts: 'public/dist/js'
    };

// Initialize Browser Sync
// gulp.task('browser-sync', function () {
//   if(!argv.production) {
//     browserSync({
//       port: 3000,
//       proxy: '127.0.0.1:1337'
//     });
//   }
// });

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
      // .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
    .pipe(remember('sass'));
});

// Minify and package images and svg
gulp.task('images', function () {
  // Minify Images
  gulp.src(source.images)
    .pipe(imgmin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(destination.images));
    // .pipe(gulpif(!argv.production, browserSync.reload({stream:true})));
  
  // Minify SVG
  gulp.src(source.svg)
    .pipe(svgmin([
      { removeDoctype: false },
      { removeComments: false },
      { removeHiddenElems: { circleR0: false } }
    ]))
    .pipe(gulp.dest(destination.images));
    // .pipe(gulpif(!argv.production, browserSync.reload({ stream:true })));
});


gulp.task('scripts', function () {
  var browserified = transform(function(filename) {
    var b = browserify({
      entries: [filename],
      transform: [reactify],
      debug: true
    });
    return b.bundle();
  });
  return gulp.src(['./public/assets/js/app.js']) 
    .pipe(browserified)
    .pipe(gulpif(argv.production, uglify()))
    .pipe(rename({ suffix: '.min', extname: '.js' }))
    // .pipe(gulpif(!argv.production, browserSync.reload({ stream:true, once: true })))
    .pipe(gulp.dest(destination.scripts));
});



// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(source.sass, ['sass']);
  gulp.watch([source.svg, source.images], ['images']);
  gulp.watch(source.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'sass',
  'images',
  'scripts',
  // 'browser-sync',
  'watch'
]);