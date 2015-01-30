//
// GULP CONFIGURATION ------------------------------------------------
// Frontend boilerplate/kickstart/... running on Gulp, Sass & Compass
// Build with love for everyday use at Little Miss Robot
//
// Credits & inspiration
// - http://github.com/yeoman/generator-gulp-webapp
// - http://yeoman.io/blog/performance-optimization.html
// - http://smashingmagazine.com/2014/06/11/building-with-gulp
// - http://github.com/flovan/headstart
//
// SETUP -------------------------------------------------------------
//
// 1) If not present on your system (aka install once):
// - install Node (http://nodejs.org)
// - install latest Ruby Gem: (sudo) gem update --system
// - install Compass Ruby Gem: (sudo) gem install compass
// - install Gulp (globally):  (sudo) npm install gulp -g
//
// 2) Navigate to your project folder (aka install for each project):
// - install Gulp (locally):   (sudo) npm install gulp --save-dev
// - install dependencies:     (sudo) npm install
//
// COMMON TASKS ------------------------------------------------------
//
// - gulp iconfont: create an icon-font from svg-sources (manual task)
// - gulp server:   start a web server for development
// - gulp build:    build a production version (deploy)
// - gulp:          defaults to 'gulp build'
//

'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();


//
// GULP BUILD --------------------------------------------------------
//

gulp.task('default', ['build']);
gulp.task('build', [

	'clean'

], function() {

	gulp.start('html');
	gulp.start('images');
	gulp.start('copy');

});


//
// GULP SERVER -------------------------------------------------------
//

gulp.task('server', [

	'clean',
	'compass',
	'templates'

], function() {

	plugins.livereload.listen();
	gulp.start('connect');
	gulp.watch('development/sass/**/*.scss', ['compass']);
	gulp.watch('development/templates/**/*.hbs', ['templates']);
	gulp.watch([

		'development/**/*.html',
		'development/**/*.js',
		'development/img/**',
		'.temp/**/*.css'

	]).on('change', plugins.livereload.changed);

	//
	// Auto-open browser window
	// - https://www.npmjs.org/package/opn
	//

	require('opn')('http://localhost:9000');

});


//
// GULP ICONFONT -----------------------------------------------------
// Note: creation of the icon font is a stand-alone
// task and should be performed before running the
// server or build task
//
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-imagemin
// - https://www.npmjs.org/package/gulp-iconfont
// - https://www.npmjs.org/package/gulp-consolidate
// - https://www.npmjs.org/package/lodash
// - https://www.npmjs.org/package/gulp-rename
//

gulp.task('iconfont', function() {

	//
	// Set svg-sources, optimize svg
	// and start creating the font
	//

	gulp.src('development/fonts/icon-sources/*.svg')
		.pipe(plugins.plumber())
		.pipe(plugins.imagemin())
		.pipe(plugins.iconfont({

			//
			// Set file-name for the font and append
			// codepoints so we always have the same
			// CSS codes (eg. content: '\e001')
			//

			fontName: 'icons',
			appendCodePoints: true

		})).on('codepoints', function(codepoints, options) {

			//
			// Create the __icons.scss file based
			// on the template and inject font-name
			// path and CSS class-name
			//

			gulp.src('development/fonts/icon-sources/_template.scss')
				.pipe(plugins.consolidate('lodash', {

					glyphs: codepoints,
					fontName: 'icons',
					fontPath: '../fonts',
					className: 'icon'

				}))
				.pipe(plugins.rename('_icons.scss'))
				.pipe(gulp.dest('development/sass/base'));

		})
		.pipe(gulp.dest('development/fonts'));

});


//
// COMPASS -----------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-compass
// - https://www.npmjs.org/package/gulp-combine-media-queries
// - https://www.npmjs.org/package/gulp-autoprefixer
//

gulp.task('compass', function() {

	return gulp.src('development/sass/**/*.scss')
		.pipe(plugins.plumber())
		.pipe(plugins.compass({

			sass: 'development/sass',
			css: '.temp/css'

			// Important: this on is only used
			// with inline-image() which converts
			// images to Base64 Encoded strings
			// ==> image: base.develop +'/img'

		}))
		.pipe(plugins.combineMediaQueries({ use_external: true }))
		.pipe(plugins.autoprefixer('last 2 versions'))
		.pipe(gulp.dest('.temp/css'));

});


//
// SCRIPTS -----------------------------------------------------------
//

gulp.task('scripts', function() {

	return gulp.src('development/js/**/*.js')
		.pipe(plugins.plumber())
		.pipe(gulp.dest('.temp/js'));

});

//
// TEMPLATES ---------------------------------------------------------
//
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('templates', function(){
	gulp.src('development/templates/*.hbs')
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'tpl',
			noRedeclare: true // Avoid duplicate declarations
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('development/js/lib/'));
});


//
// HTML --------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-useref
// - https://www.npmjs.org/package/gulp-if
// - https://www.npmjs.org/package/gulp-csso
// - https://www.npmjs.org/package/gulp-uglify
// - https://www.npmjs.org/package/gulp-rev
// - https://www.npmjs.org/package/gulp-rev-replace
// - https://www.npmjs.org/package/gulp-inject
// - https://www.npmjs.org/package/gulp-htmlmin
//
// Additional optimizations
// - http://yeoman.io/blog/performance-optimization.html
// - remove unused CSS: https://www.npmjs.org/package/gulp-uncss
// - inline CSS above the fold: https://github.com/addyosmani/critical
//

gulp.task('html', [

	'compass',
	'scripts'

], function() {

	var assets = plugins.useref.assets();
	gulp.src([

			'development/**/*.html',
			'!development/fonts/**'

		])
		.pipe(plugins.plumber())
		.pipe(gulp.dest('.temp'))
		.pipe(assets)

		.pipe(plugins.if('*.css', plugins.csso()))
		.pipe(plugins.if('*.js', plugins.uglify()))
		.pipe(plugins.rev())

		.pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
		//.pipe(plugins.inject(
    	//	gulp.src('deploy/**/*.css', {read: false}), {
      	//		transform: function(url, file, index, a) {
      	//			console.log( index, url.slice(8)  );
        //			return '<meta data-href="' + url.slice(8) + '" />';
      	//		}
    	//	}
  		//))
        .pipe(plugins.htmlmin({

        	collapseWhitespace: true,
        	removeComments: true

        }))
		.pipe(gulp.dest('deploy'));

});


//
// IMAGES ------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-imagemin
//

gulp.task('images', function() {

	var options = {
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	}

	gulp.src('development/img/**')
		.pipe(plugins.plumber())
		.pipe(plugins.imagemin(options))
		.pipe(gulp.dest('deploy/img'));

	gulp.src('development/meta/*.+(ico|jpg|png)')
		.pipe(plugins.plumber())
		.pipe(plugins.imagemin(options))
		.pipe(gulp.dest('deploy'));

});


//
// COPY --------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.org/package/gulp-rename
//

gulp.task('copy', function() {

	gulp.src('development/meta/__htaccess.txt')
		.pipe(plugins.plumber())
		.pipe(plugins.rename('.htaccess'))
		.pipe(gulp.dest('deploy'));

	gulp.src('development/meta/__browserconfig.xml')
		.pipe(plugins.plumber())
		.pipe(plugins.rename('browserconfig.xml'))
		.pipe(gulp.dest('deploy'));

	gulp.src('development/fonts/*.*')
		.pipe(plugins.plumber())
		.pipe(gulp.dest('deploy/fonts'));

});


//
// CLEAN -------------------------------------------------------------
// - https://www.npmjs.org/package/del
//

gulp.task('clean', require('del').bind(null, [

	'deploy',
	'.sass-cache',
	'.temp'

]));


//
// CONNECT -----------------------------------------------------------
// - https://www.npmjs.org/package/serve-static
// - https://www.npmjs.org/package/serve-index
// - https://www.npmjs.org/package/connect
// - https://www.npmjs.org/package/connect-livereload
// - https://www.npmjs.org/package/http
//

gulp.task('connect', function() {

	//
	// Create middleware functions to serve static
	// files and pages that contain directory
	// listings for a given root directory
	//

	var serveStatic = require('serve-static'),
	    serveIndex = require('serve-index');

	//
	// Create the middleware and
	// add the live-reload script
	//

	var app = require('connect')()
		.use(require('connect-livereload')({port: 35729}))
		.use(serveStatic('development'))
		.use(serveIndex('development'))
		.use(serveStatic('.temp'));

	//
	// Create server and
	// start listening
	//

	require('http')
		.createServer(app)
		.listen(9000)

});

