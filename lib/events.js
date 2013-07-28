/**
  A small implementation of an Event manager. It does not
  require initialization via constructor.

  @class Events
  @constructor
**/
function Events() {
  this._eventSubscribers = {}
};

/**
  Subscribes to an event by key.

  @param {String} key   event key
  @param {Function} fn  subscriber
**/
Events.prototype.on = function(key, fn) {
  if (this._eventSubscribers===undefined) { this._eventSubscribers = {}; }
  if (typeof key === 'function') { fn = key; key = ""; }
  if (!this._eventSubscribers[key]) { this._eventSubscribers[key]=[]; }
  this._eventSubscribers[key].push(fn);
  return this;
};

/**
  Removes a subscriber.

  @param {String} key   event key
  @param {Function} fn  subscriber
**/
Events.prototype.off = function(key, fn) {
  if (this._eventSubscribers===undefined) { return; }
  if (this._eventSubscribers[key]===undefined) { return; }
  var removalIndex = this._eventSubscribers[key].indexOf(fn);
  if (removalIndex >= 0) {
    this._eventSubscribers[key].splice(removalIndex, 1);
  }
  return this;
};

/**
  Emits arguments to all subscribers.

  @param {String} key  event key
  @param ...  additional arguments provided to subscribers
  @return `this` with which the call is bound to
**/
Events.prototype.emit = function(key)  {
  if (this._eventSubscribers===undefined) { return; }
  var last_result
  if (this._eventSubscribers.hasOwnProperty(key)) {
    var emitArgs = Array.prototype.slice.call(arguments, 1);
    this._eventSubscribers[key].forEach(function(fn){
      last_result = fn.apply(this, emitArgs)
    });
  }
  return last_result;
};

module.exports = Events;
