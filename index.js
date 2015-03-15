Q = require('q');

module.exports = function() {
  return function() {
    return Q.promise(function(resolve, reject) {
    });
  };
}
