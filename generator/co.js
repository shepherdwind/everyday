'use strict';
function* a(){
  var d = yield b(10);
  console.log(d);
  var f = yield c();
  console.log(f);
}

function b(time){
  return function(done){
    setTimeout(function(){
      done(null, time + 10);
    }, time);
  };
}

function* c(){
  var d = yield b(11);
  console.log(d);
  return 'hello';
}

var gen = a();

gen.next().value(function(err, ret){
  var next = gen.next(ret).value; // ret value eql to d

  // c is generator, use next to run
  next.next().value(function(err, ret){
    var a = next.next(ret);
    gen.next(a.value);
  });
});
