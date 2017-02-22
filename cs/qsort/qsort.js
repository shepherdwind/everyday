'use strict';

function qsort(arr, left = 0, right = arr.length - 1) {
  const first = arr[left];
  let split = left + 1;

  if (left >= right) {
    return;
  }

  for (let i = split; i <= right; i++) {
    if (arr[i] < arr[left]) {
      swap(arr, i, split);
      split += 1;
    }
  }

  swap(arr, left, split - 1);
  qsort(arr, left, split - 1);
  qsort(arr, split, right);
  return arr;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

module.exports = qsort;
