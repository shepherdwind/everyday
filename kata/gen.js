'use strict';

function factorialSeq() {
	let number = 0;
	return function(value) {
  	if (number === 0) {
      number += 1;
    	return 1;
    }
    return value * (number++);
  };
}

function generator(sequencer) {
	let value;
  const fn = sequencer();
	return {
  	next: function() {
    	value = fn(value);
      return value;
    }
  };
}

function rangeSeq(start, step) {
	return function(value) {
  	return value ? (value + step) : start;
  };
}

function primeSeq() {
  const primes = [2];
  return function(last) {
    if (!last) {
      return 2;
    }
    while (true) {
      last += 1;
      if (primes.every(n => last % n !== 0)) {
        primes.push(last);
        return last;
      };
    }
  };
}

var seq = generator(primeSeq);
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
