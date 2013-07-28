var Deferred = require('../lib/deferred.js');

exports.pending = function(){
  var deferred = new Deferred();
  return {
    promise: deferred.promise,
    fulfill: deferred.fulfill,
    reject: deferred.reject
  };
};
exports.fulfilled = Deferred.fulfilled
exports.rejected = Deferred.rejected
