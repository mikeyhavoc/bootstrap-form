const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

dest = {
    'sassSrc' : "./src/scss/**/*.scss",
    'sassDest' : "./src/css-pre/",
    'postCss' : "./src/css-pre/**/*.css",
    'postDest' : "./src/css-pre/",
    'maps' : "./maps/",
    'broswerSysnc' : "./public",
    'miniSrc' : "./src/css-pre/**/*.css",
    'miniDest' : "./public/css/"

}



gulp.task('sass', function () {
    return gulp.src(dest.sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest.sassDest));
    });

gulp.task('autoprefixer', function () {
    return gulp.src(dest.postCss)
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer( {
            browsers: ['last 2 versions']
        }) ]))
        .pipe(sourcemaps.write(dest.maps))
        .pipe(gulp.dest(dest.postDest));
    });

    gulp.task('minifyCss',() => {
        return gulp.src(dest.miniSrc)
            .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(dest.miniDest));
        });

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: dest.browserSync
        }
    });
});

gulp.task('default', ['sass', 'autoprefixer', 'minifyCss']);