'use strict'
var http = require('http');
var Router = require(__dirname + '/lib/router.js');
//var writeDirectory = require(__dirname + '/lib/writeDirectory.js');

var router = new Router();

router.get('/test', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Test worked again!');
  res.end();
});

router.get('/stat', function(req, res) {
  router.stat(req, res);
})

var server = http.createServer(function(req, res) {
  router.route(req, res);
}).listen(3000, function() {
  console.log('server listening on port 3000');
});