'use strict';

var wrap = require('./wrap');
function mult(a, b) {
  return b === 0 ? 0 : a + mult(a, b - 1);
}

mult = wrap(mult);
console.log(mult(6, 1000));
console.log(mult.count);

function fastMult(a, b) {
  if (b === 0) {
    return 0;
  }

  if (b % 2 === 0) {
    return fastMult(a, b >> 1) << 1;
  } else {
    return a + (fastMult(a, (b - 1) >> 1) << 1);
  }
}

fastMult = wrap(fastMult);
console.log(fastMult(15, 100500));
console.log(fastMult.count);
