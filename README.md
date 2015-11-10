# super_framework

[![Build Status](https://travis-ci.org/tinasharma/super_framework.svg?branch=tina_framework)](https://travis-ci.org/tinasharma/super_framework)

A simple HTTP server framework, including basic router, response methods, a directory
=======
A simple HTTP server framework, including basic router with response methods, a directory

Table of Contents
=================

* `Router` constructor
* `respond(res, data)`
* `sendFile(filename, res)`
* `writeDirectory(filepath, method)`
* Request `Counter`
* Example Implementation

# Router

  A basic REST request router. To implement, require in super_framework as a new
  router constructor.

  ```var Router = require('super_framework');

  var router = new Router();```

# respond(res, data)

  Sends a simple 'OK' HTTP response. User provides response object and data to write.

  Example:

  `Router.respond(res, 'hello world!');    // writes 'hello world!' to response object.`

# sendFile(filename, res)

  The send file function is used for sending back a file, the header, and the response.

  How to use it:

  `router.sendFile(filepath, res);`

  NOTE: filepath MUST include root directory (see example below);

# writeDirectory(router, filepath, method)

  Reads all files in a directory and assigns a response to them.

  The writeDirectory function takes two arguments: the filepath of the directory
  to read, and the REST method to call on it. writeDirectory will register all
  files as properties of the appropriate method, and assign the appropriate
  response function. At this time writeDirectory only assigns responses to GET
  requests. NOTE: Filepath MUST include root directory (see example below)

  Example:

  `Router.writeDirectory('/directory', 'GET');    // returns all files in directory on request`

# Request Counter

  Counters for requests are designed for tracking user's activity.
  Counter is a number. It shows how many times particular url has been requested.
  How to use it:

  1. Creating new instance of Route object:

    `var route = new Route();`

  2. Creating routes:

    ```router.get('/first', function(req, res){
      respond(res, "It's the first route")
    });
    router.get('/second', function(req, res){
     respond(res, "It's the second route")
    });```

  3. Creating the route which is responsible for counters:

    ```router.get('/count', function(req, res) {
    router.stat(req, res);
   })```

  'stat' is built-in method of Router object. It needs to be used in order to
  receive statistic information. In this example 'count' request will give
  statistics for user's requests.

------------------------------------------

# Example Implementation

```'use strict';

var http = require('http');
var Router = require(__dirname + '/../index.js');

var router = new Router();

router.writeDirectory('/test/testDirectory', 'GET');

router.get('/', function(req, res) {
  router.routes['GET']['/test/testDirectory/test2/home.html'](req, res);
});

router.get('/test', function(req, res){
  router.respond(res, 'hello, world!');
});

router.get('/test2', function(req, res) {
  router.sendFile('test/testDirectory/boo.html', res);
});

router.get('/stat', function(req, res) {
  router.stat(req, res);
});

var server = http.createServer(function(req, res) {
  router.route(req, res);
}).listen(3000, function() {
  console.log('server listening on port 3000');
});```
