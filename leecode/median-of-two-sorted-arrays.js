/*
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5

链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const result = [];
  let len = (nums1.length + nums2.length) / 2;
  let i = 0;
  let j = 0;
  // 异常分支
  if (len < 1) {
    return nums1[0] !== undefined ? nums1[0] : nums2[0];
  }
  do {
    const a = nums1[i];
    const b = nums2[j];
    // 分支 1 ，两个数组元素都存在
    if (i < nums1.length && j < nums2.length) {
      if (a < b) {
        result.push(a);
        i += 1;
      } else {
        result.push(b);
        j += 1;
      }
    } else {
      // 某一个数组元素没有了
      if (a !== undefined) {
        result.push(a);
        i += 1;
      }
      if (b !== undefined) {
        result.push(b);
        j += 1;
      }
    }
  } while (result.length <= len)
  return result.length - len === 1 ? (result.pop() + result.pop()) / 2 : result.pop();
};

// const ret = findMedianSortedArrays([1, 2, 3], []);
// console.log(ret);

function findMedianSortedArrays1(nums1 = [], nums2 = []) {
  return findMinNumbers(nums1, nums2, 0);
}

function getMid(min, max, left = 0) {
  const total = min.length + max.length + left;
  if (total < 2) {
    return min.length ? min[0] : max[0];
  }

  const mid = total / 2;
  let index = mid - left;
  // 偶数
  if (total % 2) {
    index = Math.ceil(index);
    return min.length >= index ? min[index - 1] : max[index - min.length];
  }

  const a = min.length > index - 1 ? min[index - 1] : max[index - min.length - 1];
  const b = min.length > index ? min[index] : max[index - min.length];
  return (a + b) / 2
}

function findMinNumbers(nums1 = [], nums2 = [], left = 0) {
  const len = (nums1.length + nums2.length + left) / 2;
  const mid = (len - left) / 2;

  // 不重复数组情况
  if (nums1[0] >= nums2[nums2.length - 1] || !nums2.length) {
    return getMid(nums2, nums1, left);
  }
  if (nums2[0] >= nums1[nums1.length - 1] || !nums1.length) {
    return getMid(nums1, nums2, left);
  }

  if (mid === 0.5) {
    return (nums1[0] + nums2[0]) / 2;
  }

  const index = Math.ceil(mid) - 1;
  let min1 = nums1[index];
  let min2 = nums2[index];
  // 超过的情况，取最后一个
  if (nums1.length - 1 < index) {
    min1 = nums1[nums1.length - 1];
  }
  if (nums2.length - 1 < index) {
    min2 = nums2[nums2.length - 1];
  }
  if (min1 > min2) {
    return findMinNumbers(nums1, nums2.splice(index + 1), left + index + 1);
  } else {
    return findMinNumbers(nums1.splice(index + 1), nums2, left + index + 1);
  }
}

console.log(findMedianSortedArrays1([1,3], [2]));
console.log(findMedianSortedArrays1([1,3], [2,4,5]));