Q = require('q');

module.exports = function(s3Event) {
  return function(options) {
    if (!options) { options = {} }
    return Q.promise(function(resolve, reject) {
      if (s3Event &&
          s3Event.Records &&
          s3Event.Records[0] &&
          s3Event.Records[0].s3 &&
          s3Event.Records[0].s3.bucket &&
          s3Event.Records[0].s3.bucket.name &&
          s3Event.Records[0].s3.object &&
          s3Event.Records[0].s3.object.key
         ) {
        options.srcBucket = s3Event.Records[0].s3.bucket.name
        options.srcKey = s3Event.Records[0].s3.object.key

        resolve(options)
      } else {
        reject(new Error('Inputted S3 Event could not be transformed'));
      }
    });
  };
}
