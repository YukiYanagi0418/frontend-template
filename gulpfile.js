var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function(){
	browser({
		server: {
			baseDir: "./dest"
		}
	});
});
gulp.task("sass", function(){
	gulp.src("src/sass/**/*scss")
		.pipe(plumber())
		.pipe(frontnote({
			css: '../css/style.css'
		}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("./dest/css"))
		.pipe(browser.reload({stream:true}));
});

gulp.task("js", function(){
	gulp.src(["src/js/**/*.js", "!src/js/min/**/*.js"])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest("./dest/js"))
		.pipe(browser.reload({stream:true}));
});

gulp.task("html", function(){
	gulp.src(["src/**/*.html"])
		.pipe(gulp.dest("./dest"))
		.pipe(browser.reload({stream:true}));
});

gulp.task("default",['server'], function(){
	gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
	gulp.watch("sass/**/*.scss", ["sass"]);
});
