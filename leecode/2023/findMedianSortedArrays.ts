function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let index1 = 0;
  let index2 = 0;
  let n: number;
  let m: number
  const mid = (nums1.length + nums2.length - 1) / 2;
  const low = Math.floor(mid);
  const high = Math.ceil(mid);

  for (let i = 0; i <= high; i++) {
    if (index2 >= nums2.length || nums1[index1] <= nums2[index2]) {
      n = nums1[index1];
      index1 += 1;
    } else {
      n = nums2[index2];
      index2 += 1;
    }
    if (i === low) {
      m = n;
    }
  }
  return (n + m) / 2;
};

console.log(findMedianSortedArrays([1,3], [2]));
console.log(findMedianSortedArrays([2], []));