'use strict'
var expect = require('chai').expect;
var writeDirectory = require(__dirname + '/../lib/writeDirectory');
var Router = require(__dirname + '/../lib/router.js');


describe('the writeDirectory function', function() {
  before(function() {
      this.router = new Router();
  });

  it('should populate the GET property', function() {
    writeDirectory(this.router, '/test/testDirectory', 'GET');
    expect(this.router.routes['GET']).to.not.eql({});
    expect(this.router.routes['GET']['/test/testDirectory/boo.js']).to.not.eql(undefined);
  });

});
