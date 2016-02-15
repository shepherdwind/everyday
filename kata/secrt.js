'use strict';

const triplets1 = [
  ['w', 'h', 'i'],
  ['a', 't', 's'],
  ['t', 'u', 'p'],
  ['t', 's', 'u'],
  ['h', 'a', 'p'],
  ['t', 'i', 's'],
  ['w', 'h', 's'],
];

const recoverSecret = function recoverSecret(triplets) {
  const list = {};
  triplets.map(function(arr) {
    arr.map(function(letter, i) {
      list[letter] = list[letter] || [];
      for (let j = 0; j < i; j++) {
        if (list[letter].indexOf(letter) === -1) {
          list[letter].push(arr[j]);
        }
      }
    });
  });

  return order(list);
};

var recoverSecret1 = function(triplets) {
  for(var item of triplets)
  {
    let first = item[0];
    if (triplets.every(tuple => tuple.indexOf(first) <= 0))
    {
      triplets.filter((_item) => _item[0] == first).forEach(tuple => tuple.shift());
      return first + recoverSecret(triplets.filter(tuple => tuple.length > 0));
    }
  }
  return '';
}

function order(list) {
  const found = [];
  const letters = Object.keys(list);
  while (found.length !== letters.length) {
    letters.some(function(letter) {
      if (found.indexOf(letter) !== -1) {
        return false;
      }

      if (list[letter].size === 0) {
        found.push(letter);
        return true;
      }

      if (list[letter].every(item => found.indexOf(item) !== -1)) {
        found.push(letter);
        return true;
      }
    });
  }
  return found;
}

console.log(recoverSecret1(triplets1));
