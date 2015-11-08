'use strict'
var Router = exports = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {}
  }
}

Router.prototype.get = function(route, callback) {
  this.routes['GET'][route] = callback;
}

Router.prototype.post = function(route, callback) {
  this.routes['POST'][route] = callback;
}
Router.prototype.put = function(route, callback) {
  this.routes['PUT'][route] = callback;
}
Router.prototype.patch = function(route, callback) {
  this.routes['PATCH'][route] = callback;
}
Router.prototype.delete = function(route, callback) {
  this.routes['DELETE'][route] = callback;
}
Router.prototype.fourOFour = function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write("NOT FOUND!");
  res.end();
}

Router.prototype.route = function(req, res) {
  (this.routes[req.method][req.url] || this.fourOFour)(req, res);
}
