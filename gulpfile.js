'use strict';
var gulp = require('gulp');
var expect = require('chai').expect;
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var appFiles = ['server.js', __dirname + '/lib/**/*.js'];
var testFiles = ['gulpfile.js', __dirname + '/lib/**/*.js'];

gulp.task('jshint:apps', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node:true
    }))
    .pipe(jshint.reporter('default'));
});

// Revist globals in tests?
gulp.task('jshint:tests', function() {
  return gulp.src(testFiles)
    .pipe(jshint({
      node:true,
      globals:{
        describe:true,
        it:true,
        before:true
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint', ['jshint:apps', 'jshint:tests']);

gulp.task('mocha', function() {
  return gulp.src(appFiles)
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(appFiles, ['jshint:apps', 'mocha']);
  gulp.watch(testFiles, ['jshint:tests']);
});

gulp.task('default', ['watch']);
