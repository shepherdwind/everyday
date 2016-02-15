'use strict';

function sumStrings(a, b) {
  const lenA = a.length;
  const lenB = b.length;
  const total = Math.max(lenA, lenB);
  let ret = [];

  let add = false;
  for (var i = total - 1; i >= 0; i--) {
    const number = parseInt(a[i - total + lenA] || 0, 10) + parseInt(b[i - total + lenB] || 0, 10) + (add ? 1 : 0);
    if (number > 9) {
      ret.push(number - 10);
      add = true;
    } else {
      add = false;
      ret.push(number);
    }
  }
  if (add) { ret.push(1); }
  ret.reverse();
  while(ret[0] === 0) {
  	ret.shift();
	}

  return ret.join('');
}

console.log(sumStrings('00103', '08561'));
