function LRUCache(capacity, o) {

  if (!(this instanceof LRUCache)) {
    return new LRUCache(capacity);
  }

  var size = o ? Object.keys(o).length : 0;
  var cache = {};

  Object.defineProperty(this, 'capacity', {
    value: capacity
  });

  Object.defineProperty(this, 'size', {
    value: size,
    configurable: true,
    enumerable: false
  });

  Object.defineProperty(this, 'cache', {
    value: function(key, val) {
      Object.defineProperty();
      return this;
    }
  });
}
