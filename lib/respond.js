module.exports = exports = function respond(res, data) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(data);
  res.end();
};
