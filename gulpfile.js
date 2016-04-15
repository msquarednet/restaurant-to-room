var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // gulp.src('public/js/app/**/*.js')  define main angular module, before adding components to it
  gulp.src([
    'public/js/app/app.js',
    'public/js/app/**/*.js'   //app.js WONT be repeated as part of this second glob
    ])
    .pipe(concat('rtr.min.js')) //combine
    .pipe(uglify())             //minify
    .pipe(gulp.dest('public/js/build'))
})