'use strict';
var p1 = function() {
  return new Promise(function(resolve) {
    console.log('start 1');
    setTimeout(function() {
      console.log('end 1');
      resolve(1);
    }, 30);
  });
};

var p2 = function() {
  return new Promise(function(resolve) {
    console.log('start 2');
    setTimeout(function() {
      console.log('end 2');
      resolve(2);
    }, 26);
  });
};

var p3 = function() {
  return new Promise(function(resolve) {
    console.log('start 3');
    setTimeout(function() {
      console.log('end 3');
      resolve(3);
    }, 26);
  });
};

var p4 = function() {
  return Promise.resolve(4);
};

function step(arr, i) {
  var result = '';
  i = i || 0;
  if (!arr[i]) {
    return Promise.resolve('');
  }

  return new Promise(function(resolve) {
    arr[i]().then(function(ret) {
      result += ret;
      step(arr, i + 1).then(function(ret) {
        result += ret;
        resolve(result);
      });
    });
  });
}

step([p2, p1, p3, p4]).then(function(ret) {
  console.log(ret);
});
