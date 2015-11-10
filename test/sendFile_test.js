'use strict';

var expect = require('chai').expect;
var sendFile = require(__dirname + '/../lib/sendFile.js');
var fs = require('fs');

describe('the sendFile function', function(){

    var res = {
      writeHead: function(status, headers) {
        status = 200;
        headers = {'Content-Type': 'text/html'};
      },
      write: function(file) {
        file = fs.readFileSync(__dirname + '/..');
      },
      end: function() {
        end = true;
      }
    };

    it('should write the headers', function() {
      function sendFile(filename, res) {
        expect(res.writeHead.headers).to.eql({'Content-Type': 'text/html'});
      }
    });

    it('should write the status', function() {
      function sendFile(filename, res) {
        expect(res.writeHead.status).to.eql(200);
      }
    });

    it('should read and write the contents of file', function() {
      function sendFile(filename, res) {
        expect(res.write.file).to.eql(fs.readFileSync(__dirname + '/..'));
      }
    });

    it('should check for response end', function() {
      function sendFile(filename, res) {
        expect(res.end).to.eql(true);
      }
    });
});
