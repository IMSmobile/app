var gulp = require('gulp');
var tslint = require('ionic-gulp-tslint');

gulp.task('lint', function () {
  return tslint({
    src: 'src/**/*.ts',
    tslintOptions: {
      configuration: 'tslint.json'
    },
    reporter: "verbose",
    reportOptions: {
      emitError: false
    }
  });
});