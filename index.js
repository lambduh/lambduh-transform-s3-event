Q = require('q');

module.exports = function(s3Event) {
  return function() {
    return Q.promise(function(resolve, reject) {
      if (s3Event) {
      } else {
        reject(new Error('Passed S3 Event could not be transformed'));
      }
    });
  };
}
