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
