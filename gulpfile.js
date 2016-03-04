var gulp = require("gulp");
var concat = require("gulp-concat");
var concatcss = require("gulp-concat-css");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var rename = require("gulp-rename");
var gulpif = require("gulp-if");
var minifyCss = require("gulp-minify-css");
//with gulp-webpack main moudle
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./build/webpack.base.config");
var runSequence = require("run-sequence");//按照序列任务执行
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//Get all framer.js
//let path and concat jsfiles 
var paths = {
        root: './',
        lib: {
            root: 'lib/build/js/',
            rootcss: 'lib/build/css/'
        },
        src:{
            root: 'src/js/',
            rootcss:'src/css/',
            dist :'dist/js',
            distcss:'dist/css'
        }
    };
var framework = {
        filename: 'framework',
        filenamecss: 'style',
        jsFiles: [
            'lib/framework7/js/wrap-start.js',
            'lib/framework7/js/f7-intro.js',
            'lib/framework7/js/views.js',
            'lib/framework7/js/navbars.js',
            //'lib/framework7/js/searchbar.js',
            //'lib/framework7/js/messagebar.js',
            'lib/framework7/js/xhr.js',
            'lib/framework7/js/pages.js',
            'lib/framework7/js/router.js',
            'lib/framework7/js/modals.js',
            //'lib/framework7/js/progressbar.js',
            'lib/framework7/js/panels.js',
            //'lib/framework7/js/lazy-load.js',
            //'lib/framework7/js/material-preloader.js',
            //'lib/framework7/js/messages.js',
            //'lib/framework7/js/swipeout.js',
            //'lib/framework7/js/sortable.js',
            //'lib/framework7/js/smart-select.js',
            //'lib/framework7/js/virtual-list.js',
            'lib/framework7/js/pull-to-refresh.js',
            //'lib/framework7/js/infinite-scroll.js',
            'lib/framework7/js/scroll-toolbars.js',
            //'lib/framework7/js/material-tabbar.js',
            'lib/framework7/js/tabs.js',
            //'lib/framework7/js/accordion.js',
            'lib/framework7/js/fast-clicks.js',
            'lib/framework7/js/clicks.js',
            'lib/framework7/js/resize.js',
            //'lib/framework7/js/forms-storage.js',
            //'lib/framework7/js/forms-ajax.js',
            //'lib/framework7/js/forms-textarea.js',
            //'lib/framework7/js/material-inputs.js',
            'lib/framework7/js/push-state.js',
            //'lib/framework7/js/swiper-init.js',
            //'lib/framework7/js/photo-browser.js',
            //'lib/framework7/js/autocomplete.js',
            //'lib/framework7/js/picker.js',
            //'lib/framework7/js/calendar.js',
            //'lib/framework7/js/notifications.js',
            'lib/framework7/js/template7-templates.js',
            'lib/framework7/js/plugins.js',
            'lib/framework7/js/init.js',
            'lib/framework7/js/f7-outro.js',
            'lib/framework7/js/dom7-intro.js',
            'lib/framework7/js/dom7-methods.js',
            'lib/framework7/js/dom7-ajax.js',
            'lib/framework7/js/dom7-utils.js',
            'lib/framework7/js/dom7-outro.js',
            'lib/framework7/js/proto-support.js',
            'lib/framework7/js/proto-device.js',
            'lib/framework7/js/proto-plugins.js',
            'lib/framework7/js/template7.js',
            //'lib/framework7/js/swiper.js',
            'lib/framework7/js/wrap-end.js',

            'lib/api/js-api.js',
            'lib/api/parameter.js',
            'lib/api/api.js',
            

            'lib/framework7/plugins/framework-init.js',
            'lib/framework7/plugins/toast.js',
            'lib/framework7/plugins/share.js',

            'lib/api/log.js',
            'lib/framework7/js/underscore.js',
            'lib/vue/js/vue.js',
            
            
        ],
        cssFiles:[
            'src/less/style.less',
            'src/less/vars.less'
        ],
        html: {
          watchHome: '/.index.html', //主页
          watchAll: ['./lib/**/*','./src/**/*','./views/**/*.vue','./components/**/*.vue','./*.html'], //所有
          wacthJs :['./lib/**/*','./src/**/*','./views/**/*.vue','./components/**/*.vue'] // 所有脚本
        }
    };
// The development server (the recommended option for development)
// In accordance with the order of execution Listening service combined webpack
gulp.task("default",function(callback){
  runSequence(
    "build-watch",
    ["build-concat", "build-concat-css"],
    "build",
    callback)
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh

//dev concat 
gulp.task("build-concat", ["webpack:build-concat"]);
gulp.task("build-concat-css", ["webpack:build-concat-css"]);
// dev watch
gulp.task("build-watch", ["webpack:build-watch"]);

// dev build
gulp.task("build-dev", ["webpack:build-dev"]);

// Production build
gulp.task("build", ["webpack:build"]);

// Production build
gulp.task("build-dev-server", ["webpack-dev-server"]);

//build concat
gulp.task("webpack:build-concat",function(){
  return gulp.src(framework.jsFiles)
  .pipe(concat(framework.filename + '.js'))
  .pipe(gulp.dest(paths.lib.root))
  .pipe(gulp.dest(paths.src.root))
  .pipe(gulp.dest(paths.src.dist))
  .pipe(rename(framework.filename + '.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.lib.root))
  .pipe(gulp.dest(paths.src.root))
  .pipe(gulp.dest(paths.src.dist));
})
gulp.task("webpack:build-concat-css",function(){
  return gulp.src(framework.cssFiles)
    .pipe(gulpif(/\.less$/,less({
         })))
    .pipe(concatcss(framework.filenamecss+'.css'))
    .pipe(gulp.dest(paths.lib.rootcss))
    .pipe(gulp.dest(paths.src.rootcss))
    .pipe(gulp.dest(paths.src.distcss))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(framework.filenamecss+'.min.css'))
    .pipe(gulp.dest(paths.lib.rootcss))
    .pipe(gulp.dest(paths.src.rootcss))
    .pipe(gulp.dest(paths.src.distcss));
})
// build watch 
gulp.task("webpack:build-watch", function() {
   browserSync.init({
        server: {
            baseDir: "./"
        },
        timestamps: true,
        // Show me additional info about the process
        logLevel: "debug",
        port: 8889
    });
  gulp.watch(framework.html.watchAll,["build-dev"]);
  gulp.watch(framework.html.watchAll).on('change', reload);
  gulp.watch(framework.html.watchAll,function(event){
     gutil.log("[webpack:build-dev]",'File ' + event.path + ' was ' + event.type + ', run task watch...');
  });
});

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    // gutil.log("[webpack:build]", stats);
    callback();
  });
});

// Production build run
gulp.task("webpack:build-dev",function(callback) {
  // modify some webpack config options
  var myDevConfig = Object.create(webpackConfig);
  myDevConfig.devtool = "sourcemap";
  myDevConfig.debug = true;

  // create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);
  // run webpack
  webpack(myDevConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack:build-dev", err);
      // gutil.log("[webpack:build-dev]",stats.toString());
      callback();
    });
});


