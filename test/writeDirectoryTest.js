'use strict'
var expect = require('chai').expect;
var writeDirectory = require(__dirname + '/../lib/writeDirectory');
var Router = require(__dirname + '/../lib/router.js');


describe('the writeDirectory function', function() {
  before(function() {
      this.router = new Router();
  });

  it('should populate the GET object', function() {
    writeDirectory(this.router, '/test/testDirectory', 'GET');
    expect(this.router.routes['GET']).to.not.eql({});
  });

  it('should have files from the first directory depth', function() {
    expect(this.router.routes['GET']['/test/testDirectory/boo.js']).to.not.eql(undefined);
  });

  it('should have files from additional depths', function() {
    expect(this.router.routes['GET']['/test/testDirectory/test2/home.html']).to.not.eql(undefined);
  });

});
