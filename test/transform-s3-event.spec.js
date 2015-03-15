var expect = require('chai').expect;

var transform = require('../');

describe('transformS3Event', function() {
  it('should exist', function() {
    expect(transform).to.exist;
  });

  it('should return a promise', function() {
    expect(transform().then).to.exist;
    expect(transform().fail).to.exist;
  });
});
