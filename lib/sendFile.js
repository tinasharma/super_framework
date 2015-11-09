'use strict';

var fs = require('fs');

module.exports = exports = function sendFile(filename, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync(filename));
    res.end();
};
