var gulp = require('gulp');
var path = require('path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var nui = require('gulp-nui');
var nunjucks = require('gulp-nunjucks-render');

gulp.task('concat', function(){
	return gulp.src(['./src/nui.js',
              './src/util.js',
              './src/template.js',
              './src/component.js'
          ])
     .pipe(concat('nui-debug.js'))
     .pipe(gulp.dest('./dest'))
     .pipe(uglify({
    	 mangle:true,
    	 output:{
    		 keep_quoted_props:true
    	 }
     }))
     .pipe(rename('nui-min.js'))
     .pipe(gulp.dest('./dest'))
});

var config = {
	paths:{
		base:__dirname+'/',
		script:'/assets/script',
		style:'/assets/style',
		cpns:'/src/components',
		light:'/src/components/highlight'
	},
	alias:{
		placeholder:'{cpns}/placeholder',
		highlight:'{light}/highlight'
	},
	filterPath:function(src){
		return src.replace(/^\/nui\//, this.paths.base)
	}
}

gulp.task('nunjucks', function(){
  return gulp.src('./html/**/*.html')
	  .pipe(nunjucks({
	      path:'./tpl'
	    }))
	  .pipe(nui(config))
	  .pipe(gulp.dest('./'))
});

gulp.task('pages', function(){
    gulp.src(['./pages/**/*.html'])
		.pipe(nui(config))
		.pipe(gulp.dest('./pages'))
});

gulp.task('index', function(){
	return gulp.src(['./index.html'])
		.pipe(nui(config))
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
	gulp.watch(['./src/*.js'], ['concat']);
	gulp.watch(['./html/**/*.html', './tpl/*.tpl'], ['nunjucks']);
	gulp.watch(['./src/components/**/*.js', './pages/**/*.!(html)', './dest/*.js', './assets/**/*.*'], ['index', 'pages']);
});

gulp.task('default', ['concat', 'nunjucks', 'watch']);
