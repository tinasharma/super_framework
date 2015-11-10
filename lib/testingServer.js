'use strict';

var http = require('http');
var Router = require(__dirname + '/../index.js');
var localPort = process.env.PORT || 3000;

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
}).listen(localPort, function() {
  console.log('server listening at: ' + localPort );
});
