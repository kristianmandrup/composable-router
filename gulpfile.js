var gulp      = require("gulp");
var webpack   = require('webpack');
var gwebpack  = require('gulp-webpack');

var config = {
  context: __dirname + "lib",
  entry: "./index",
  output: {
    path: __dirname + "/dist",
    filename: "composable-router.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

gulp.task("webpack", function() {
  return gulp.src('./index.js')
    .pipe(gwebpack(config))
    .pipe(gulp.dest('dist/'));
});