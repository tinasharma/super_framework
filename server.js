'use strict';

var http = require('http');
var Router = require(__dirname + '/index.js');

var router = new Router();

router.writeDirectory('/testDirectory', 'GET');

router.get('/', function(req, res) {
  router.routes['GET']['/testDirectory/test2/home.html'](req, res);
});

router.get('/stat', function(req, res) {
  router.stat(req, res);
});

var server = http.createServer(function(req, res) {
  router.route(req, res);
}).listen(3000, function() {
  console.log('server listening on port 3000');
});
