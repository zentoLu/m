//安装cnpm install --save-dev gulp gulp-stylus gulp-sourcemaps
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

var base = './src/styles/',
	src = base + 'page.styl';

gulp.task('stylus', function(){
	return gulp.src(src)
        		.pipe(sourcemaps.init())
				.pipe(stylus({
					compress: true
				}))
				.on('error', function(e) {
		            console.log('stylus error',e);
		        })
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(base));
});

gulp.task('watch', function(){
    gulp.watch([base + '*.styl', base + '**/*.styl'], ['stylus']);
});

gulp.task('default', function(){
    gulp.run('stylus');
    gulp.run('watch');
});

