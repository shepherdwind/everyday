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

assert.deepStrictEqual(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]), [
  -1,
  3,
  -1,
]);

assert.deepStrictEqual(nextGreaterElements([1,2,1]), [2, -1, 2]);
assert.deepStrictEqual(nextGreaterElements([1,2,7,5,4,1]), [2, 7, -1, 7, 7, 2]);
console.log('run ok')
