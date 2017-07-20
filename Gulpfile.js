var gulp = require('gulp');  
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var neat = require('node-neat').includePaths;
var browserSync = require('browser-sync');

var paths = {
    scss: './sass/*.scss'
};

gulp.task('scripts', function() {
  gulp.src([
    './js/vendor/wow.js', 
    './js/vendor/jquery-1.11.0.js', 
    './js/vendor/imagesloaded.pkgd.js', 
    './js/vendor/masonry.pkgd.js', 
    './js/vendor/responsiveslides.js',
    './js/vendor/jquery.magnific-popup.js',
    './js/vendor/jquery.scrollTo.js',
    './js/vendor/jquery.fitvids.js',
    './js/vendor/jquery.localScroll.js',
    './js/vendor/jquery.sticky.js',
    './js/vendor/jquery.easing.1.2.js',
    './js/vendor/visualNav.js',
    './js/vendor/harvey.js', 
    './js/app.js'
    ])
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {  
    gulp.src('scss/app.scss')
        .pipe(sass({
        	includePaths: ['scss'].concat(neat)
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
      proxy: "corpo.local"
    });
});

gulp.task('watch', ['sass', 'scripts'], function () {  
    gulp.watch(["scss/*.scss", "scss/base/*.scss", "scss/sections/*.scss", "scss/style/*.scss"], ['sass']);
});
