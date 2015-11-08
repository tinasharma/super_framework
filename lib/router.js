'use strict'
var Router = exports = module.exports = function() {
	this.routes = {
		'GET': {},
		'POST': {},
		'PUT': {},
		'PATCH': {},
		'DELETE': {}
	},
  this.counts = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {}
  }
}

Router.prototype.get = function(route, callback) {
	this.routes['GET'][route] = callback;
  this.counts['GET'][route] = 0;
}

Router.prototype.post = function(route, callback) {
	this.routes['POST'][route] = callback;
  this.counts['POST'][route] = 0;
}
Router.prototype.put = function(route, callback) {
	this.routes['PUT'][route] = callback;
  this.counts['PUT'][route] = 0;
}
Router.prototype.patch = function(route, callback) {
	this.routes['PATCH'][route] = callback;
  this.counts['PATCH'][route] = 0;
}
Router.prototype.delete = function(route, callback) {
	this.routes['DELETE'][route] = callback;
  this.counts['DELETE'][route] = 0;
}
Router.prototype.fourOFour = function(req, res) {
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.write("NOT FOUND!");
	res.end();
}

Router.prototype.route = function(req, res) {
	(this.routes[req.method][req.url] || this.fourOFour)(req, res);
  this.counts[req.method][req.url]++;
}
Router.prototype.stat = function (req, res) {
  var data = JSON.stringify(this.counts["GET"]);
  data =  data.replace('{', "").replace('}', "");
  data = data.split(',');
  var newData = "";
  for (var i=0; i<data.length; i++) {
    newData += data[i] + '\n';
    
   }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Number of visits to each route \n" +  newData);
  res.end();
}