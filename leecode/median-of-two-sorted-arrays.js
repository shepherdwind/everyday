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

const ret = findMedianSortedArrays([1, 2, 3], []);
console.log(ret);
