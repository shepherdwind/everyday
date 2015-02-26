function* a(){
  var a = yield 1;
  yield 2;
  yield 3;
  return 4;
}
var b = a();
console.log(b.next());
console.log(b.next());
console.log(b.next());
console.log(b.next());

// 基本等效于
function b(){
  var step = -1;
  return {
    next: function() {
      step += 1;
      switch(step) {
        case 0 :
          return { done: false, value: 1}
        case 1 :
          return { done: false, value: 2}
        case 2 :
          return { done: false, value: 3}
        case 3:
          return { done: true, value: 4}
      }
    }
  };
}
