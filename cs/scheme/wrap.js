'use strict';

function wrap(method, option) {

  option = option || {};

  var cache = {};
  var fn = function() {
    var args = Array.prototype.slice.call(arguments);
    var text = args.join(',');

    if (option.cache && cache[text]) {
      return cache[text];
    }

    var result = method.apply(null, args);

    if (option.cache) {
      cache[text] = result;
    }

    ret.count += 1;

    if (option.debug) {
      console.log(args, result);
    }

    return result;
  };

  var ret = function() {
    return fn.apply(null, arguments);
  };

  ret.count = 1;
  return ret;
}


module.exports = wrap;
