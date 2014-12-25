var co = require('co');

function compose(middleware){
  return function *(next){
      if (!next) next = noop();
  
      var i = middleware.length;
  
      while (i--) {
            next = middleware[i].call(this, next);
          }
  
      yield *next;
    }
}

function* noop(){}

function* a(next) {
  console.log(1)
  yield next;
  console.log(4)
}

function* b(next) {
  console.log(2)
  yield next;
  console.log(3)
}

co(compose([a, b]))();

// 不用co的实现

function* composeEasy(middleware){
  var next = noop();
  next = middleware[1](next);
  // b(noop)
  /**
   * console.log(2)
   * yield noop();
   * console.log(3);
   */
  next = middleware[0](next);
  // a(b(noop))
  /**
   * console.log(1);
   * yield b(noop);
   * console.log(4);
   */
  yield next;
}

//co(composeEasy([a, b]))();

