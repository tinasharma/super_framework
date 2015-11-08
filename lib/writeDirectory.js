'use strict'
/*
Amanda Keogh
November 7, 2015
Code Fellows SEA-D45 Javascript

The writeDirectory function takes three arguments: the router to which it will be
writing, the filepath of the directory to read, and the REST method to call on it.
writeDirectory will register all files as properties of the appropriate method,
and assign the appropriate response function.
*/



/*

NEED TO:

* Make filepath navigation more flexible--how do I start it relative to the call site?
  What could I call 'this' on?

* Make it possible to provide your own function. Dilemma: How can the user access
  the filepath to make it possible to read/send the file? Here, I reference the
  element from my foreach loop. The user could, but it seems cheesy/inappropriate
  to simply tell them that a variable called "element" exists which they can use.
  Is there a way to read a property's name from inside it?

* Make Async...

*/


var fs = require('fs');
var Router = require(__dirname + '/router.js');

var writeDirectory = exports = module.exports = function(router, filepath, method) {
  var routes = getRoutes(filepath);
  routes.forEach(function(element, index, array) {
    router.routes[method][element] = function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fs.readFileSync(__dirname + '/..' + element));
      res.end();
    }
  }, router);
}

function getRoutes(filepath, fileList) {
  fileList = fileList || [];
  var directory = fs.readdirSync(__dirname + "/.." + filepath);
  directory.forEach(function(file) {
    var stats = fs.statSync(__dirname + "/.." + filepath + '/' + file);
    if (stats.isFile() && file.charAt(0) !== '.') {
      fileList.push(filepath + '/' + file);
    } else if (stats.isDirectory()) {
      getRoutes(filepath + '/' + file, fileList);
    }
  });
  return fileList;
}

