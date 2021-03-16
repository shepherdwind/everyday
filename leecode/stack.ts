import assert from "assert";
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const map = getNextGreaterMap(nums2);
  return nums1.map(item => map[item]);
}
function getNextGreaterMap(list: number[]) {
  const data: { [key: number]: number } = {};
  let temp: number[] = [];
  for (let i = list.length - 1; i > -1; i--) {
    const item = list[i];
    while (item >= temp[0]) {
      temp.shift();
    }
    data[item] = temp.length > 0 ? temp[0] : -1;
    temp.unshift(item);
  }
  return data;
}

function nextGreaterElements(nums: number[]): number[] {
  let temp: number[] = [];
  const len = nums.length;
  const result: number[] = Array(len).fill(-1);
  for (let i = nums.length * 2 - 1; i > -1; i--) {
    const item = nums[i %len];
    while (temp.length && item >= temp[temp.length - 1]) {
      temp.pop();
    }
    if (i < len && temp.length > 0) {
      result[i] = temp[temp.length - 1];
    }
    temp.push(item);
  }

  return result;
};

function dailyTemperatures(T: number[]): number[] {
  const len = T.length;
  const result = Array(len).fill(0);
  let temp: number[] = [];
  for (let i = len - 1; i >=0; i--) {
    while (temp.length > 0 && T[i] >= T[temp[temp.length - 1]]) {
      temp.pop();
    }
    result[i] = temp.length > 0 ? temp[temp.length - 1] - i : 0;
    temp.push(i);
  }
  return result;
};

assert.deepStrictEqual(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]), [
  -1,
  3,
  -1,
]);

assert.deepStrictEqual(nextGreaterElements([1,2,1]), [2, -1, 2]);
assert.deepStrictEqual(nextGreaterElements([1,2,7,5,4,1]), [2, 7, -1, 7, 7, 2]);

assert.deepStrictEqual(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0])
assert.deepStrictEqual(dailyTemperatures([89,62,70,58,47,47,46,76,100,70]), [8,1,5,4,3,2,1,1,0,0])
console.log('run ok')
