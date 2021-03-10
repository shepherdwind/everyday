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
})();
