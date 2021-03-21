import assert from 'assert';
function selectionSort(data: number[]) {
  for (let i = 0; i < data.length; i++) {
    let min = i;
    for (let j = i + 1; j < data.length; j++) {
      if (data[min] > data[j]) {
        min = j;
      }
    }
    exchange(data, min, i);
  }
  return data;
}

function insertSort(data: number[]) {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j > 0 && data[j] < data[j - 1]; j--) {
      exchange(data, j, j - 1);
    }
  }
  return data;
}

function shell_sort(data: number[]) {
  const N = data.length;
  let h = 1;
  while (h < N / 3) h = 3 * h + 1;
  while (h >= 1) {
    for (let i = h; i < N; i++) {
      for (let j = i; j >= h && data[j] < data[j - h]; j -= h) {
        exchange(data, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }
  return data;
}

function partition(data: number[], start: number, end: number) {
  let i = Math.floor(Math.random() * (end - start + 1)) + start;

  for (let j = 0; j < data.length; j++) {
    const needExchange = (data[j] > data[i] && j < i) || (data[j] < data[i] && j > i);
    if (needExchange) {
      exchange(data, j, i);
      i = j;
    }
  }
  return i;
}

function quick_sort(data: number[], start = 0, end = data.length - 1) {
  if (end - start < 1) {
    return data;
  }

  if (end - start === 1) {
    if (data[start] > data[end]) {
      exchange(data, start, end);
    }
    return;
  }
  const i = partition(data, start, end);
  quick_sort(data, start, i - 1);
  quick_sort(data, i + 1, end);
  return data;
}

function exchange(data: number[], a: number, b: number) {
  const tmp = data[a];
  data[a] = data[b];
  data[b] = tmp;
}

(() => {
  const ret = selectionSort([1, 4, 3, 2, 6, 9, 7, 8]);
  const ret2 = insertSort([1, 4, 3, 2, 6, 9, 7, 8]);
  console.log(ret);
  console.log(ret2);
  const ret3 = shell_sort([1, 4, 3, 2, 6, 9, 7, 8]);
  console.log(ret3);
})();


assert.deepStrictEqual(quick_sort([3, 1, 2, 5, 6, 4]), [1, 2, 3, 4, 5, 6])
