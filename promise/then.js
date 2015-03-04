'use strict';
function p() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('hello');
    }, 30);
  });
}

p()
.then(function(ret) {
  console.log(ret);
  throw new Error('hello');
})
.catch(function(e) {
  console.log(e.stack);
});

function pReject() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('reject');
    }, 30);
  });
}

pReject()
.then(function(ret) {
  console.log(ret);
})
.catch(function(e) {
  console.log(e);
});
