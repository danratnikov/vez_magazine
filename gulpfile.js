var gulp = require('gulp'),
  jade = require('gulp-jade'),
  coffee = require('gulp-coffee'),
  stylus = require('gulp-stylus'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
  connect = require('gulp-connect'),
	del = require('del');

var paths = {
  jade: 'app/jade/**/*.jade',
  scripts: 'app/js/**/*.coffee',
	stylus: 'app/stylus/**/*.styl',
	images: 'app/img/**/*'
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
  });
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('stylus', function() {
	gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
	// Minify and copy all JavaScript (except vendor scripts) 
	// with sourcemaps all the way down 
	gulp.src(paths.scripts)
		.pipe(coffee())
    .pipe(gulp.dest('build/js'))
		.pipe(uglify())
		.pipe(concat('vez.min.js'))
		.pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
	gulp.src(paths.images)
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('build/img'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.stylus, ['stylus']);
});

gulp.task('default', ['connect', 'jade', 'scripts', 'images', 'stylus', 'watch']);