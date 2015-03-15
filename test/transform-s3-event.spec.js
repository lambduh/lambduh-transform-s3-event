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

  it('should throw an error if the input event is null', function(done) {
    var event = null;
    transform(event)().then(function() {
      done(new Error('This event should have thrown an error.'));
    }, function(err) {
      expect(err).to.exist
      done();
    });
  });

  it('should throw an error if the input event is not an s3 Event', function(done) {
    var event = {};
    transform(event)().then(function() {
      done(new Error('This event should have thrown an error.'));
    }, function(err) {
      expect(err).to.exist
      done();
    });
  });

  it('(with proper input) should attach the srcBucket and srcKey to an inputted options object', function(done) {
    var event = require('./good-input.json')
    transform(event)().then(function(options) {
      if (options && options.srcBucket && options.srcKey) {
        expect(options.srcBucket).to.exist.and.to.be.a('string')
        expect(options.srcKey).to.exist.and.to.be.a('string')
        done()
      } else {
        done(new Error('Expected options.srcBucket, options.srcKey to exist'));
      }
    }, function(err) {
      done(err);
    });
  });

  it('(with proper input) should resolve the inputted options object', function(done) {
    var event = require('./good-input.json')
    var inputOptions = {
      key: 'value'
    }
    transform(event)(inputOptions).then(function(options) {
      if (options && options.key) {
        expect(options.key).to.equal('value')
        expect(options).to.equal(inputOptions)
        done()
      } else {
        done(new Error('Expected resolved options object to match input options'));
      }
    }, function(err) {
      done(err);
    });
  });

  it('(with proper input) should resolve a new options object if none is input', function(done) {
    var event = require('./good-input.json')
    transform(event)().then(function(options) {
      if (options) {
        done()
      } else {
        done(new Error('Expected options object to be resolved'));
      }
    }, function(err) {
      done(err);
    });
  });



});

