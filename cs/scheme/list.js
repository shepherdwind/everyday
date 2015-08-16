'use strict';

function cons(a, b) {
  return function(item) {
    return item === 0 ? a : b;
  };
}

function car(list) {
  return list(0);
}

function cdr(list) {
  return list(1);
}

function table() {
  var args = [].slice.call(arguments);
  if (args.length <= 1) {
    return cons(args[0], null);
  }

  return cons(args[0], table.apply(null, args.slice(1)));
}

function length(list) {
  function iter(lst, count) {
    return lst === null ? count : iter(cdr(lst), count + 1);
  }
  return iter(list, 0);
}

function print(list) {
  var ret = [];
  do {
    ret.push(car(list));
    list = cdr(list);
  } while (list !== null);
  console.log(ret);
}

function reverse(list) {
  function iter(newList, listLeft) {
    return listLeft === null ? newList : iter(cons(car(listLeft), newList), cdr(listLeft));
  }
  return iter(null, list);
}

let list1 = table(1, 2, 3, 4, 5);
console.log(length(list1));
print(list1);
print(reverse(list1));
console.log(length(reverse(list1)));
