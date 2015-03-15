# lambduh-transform-s3-event
Takes S3 event JSON, returns the bucket and key.

# Usage

```javascript
var Q = require('q');
var transformS3Event = require('lambduh-transform-s3-event');

//your lambda function
exports.handler = function(event, context) {
  var promises = [];
  
  promises.push(transformS3Event(event)()) //where `event` is an S3 event
  
  promises.push(function(options) {
    console.log(options.srcBucket); //source bucket for s3 Event
    console.log(options.srcKey); //source key for s3 event
    context.done()
  })
  
  promises.reduce(Q.when, Q())
    .fail(function(err) {
      console.log("derp");
      console.log(err);
      context.done(null, err);
    });
}
```

This module takes S3 Event JSON and returns the source `bucket` and `key` of the event, either by attaching `.srcBucket` and `.srcKey` to a passed options object, or, if none is passed, by creating a new one.
