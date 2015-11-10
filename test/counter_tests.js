var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);
var Router = require(__dirname + '/../lib/router');
//require(__dirname + '/./server.js');

describe('URLS counter', function(){
  it('should  get statistics for routes', function(done){
    chai.request('localhost:3000')
    .get('/stat')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should write statistic data', function(done){
    chai.request('localhost:3000')
    .get('/stat')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.not.eql(null);
      done();
    });
  });
});

 describe ('Counter checking', function () {
	 it ('counter should be 0 in the beginning', function () {
    var router = new Router;
    router.get('/test');
    var counter = router.counts['GET']['/test'];
    expect(counter).to.be.eql(0);
	});
	it ('object router.count[] should have url and count data', function () {
    var router = new Router;
    router.get('/test');
    var data = router.counts['GET'];
    expect(data).to.be.eql({'/test': 0});
	});
	 it ('object router.count[] should have url and count data', function () {
    var router = new Router;
    var data = Object.keys(router.counts);
    expect(data).to.be.eql(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
	});
});

describe ('Counter incrementing', function () {
  it ('should increment number of request "test" url', function(done) {
    var router = new Router();
    router.get('/test');
    var countBefore = router.counts['GET']['/test'];
    chai.request('localhost:3000')
    .get('/test')
    .end(function(err, res){
      req = {
        method: 'GET',
        url: '/test'
      };
      var res = {
        writeHead: function (status, headers) {
          status = 200;
          headers = {'Content-Type': 'text/plain'}
        },
        write: function(text) {
          write = true;
          text = "Result for test url"
        },
        end: function () {
          end = true;
        }
      };
      router.route(req, res);
      var counternew = router.counts['GET']['/test'];
      expect(counternew-1).to.be.eql(countBefore);
      done();
    });
  });
});


