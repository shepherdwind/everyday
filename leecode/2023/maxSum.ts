function maxSum(nums: number[], m: number, k: number): number {
  const store = new Map<number, number>();
  const len = nums.length;
  if (k > len) {
      return 0;
  }

  let max = 0;
  let ret = 0;
  for (let i = 0; i < k; i++) {
      const n = nums[i];
      store.set(n, (store.get(n) || 0) + 1)
      max += n;
  }

  if (store.size >= m) {
      ret = max;
  }

  for (let j = k; j < len; j++) {
      const pop = nums[j - k];
      const popN = store.get(pop);
      if (popN === 1) {
          store.delete(pop);
      } else {
          store.set(pop, popN - 1);
      }

      const next = nums[j];
      store.set(next, (store.get(next) || 0) + 1)

      max += next - pop;

      if (store.size >= m && max > ret) {
          ret = max;
      }
  }

  return ret;
};

console.log(maxSum([1,1,2,2], 1, 3));
