var expect = require('chai').expect;

var transform = require('../');

describe('transformS3Event', function() {
  it('should exist', function() {
    expect(transform).to.exist;
  });

  it('should return a function', function() {
    expect(transform()).to.be.a('function');
  });

  it('should return a function that returns a promise', function() {
    expect(transform()().then).to.exist;
  });

  it('should throw an error if the input event is not as expected', function(done) {
    var event = null;
    transform(event)().then(function() {
      done(new Error('This event should have thrown an error.'));
    }, function() {
      done();
    });
  });


});

