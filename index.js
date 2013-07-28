var exec = require('child_process').exec

var util = module.exports = {}

util.Deferred = require('./lib/deferred.js')
util.Events = require('./lib/events.js')

util.sh = function(command, cb){
  var e = exec(command, function(error, strout, strerr){
    process.stdout.write(strout)
    process.stderr.write(strerr)
  })
  e.on('exit', function(code){
    if (code!==0) {
      console.error("exec exited with code #{code}")
    }
    if ('function'===typeof cb) {
      cb()
    }
  })
}

util.merge = function(obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

util.extends = function(child, parent) {
  for (var key in parent) {
    if ({}.hasOwnProperty.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};