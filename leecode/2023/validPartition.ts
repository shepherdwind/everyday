function validPartition(nums: number[]): boolean {
  const memo = new Map<number, boolean>();
  const isValid = (start: number, end: number) => {
    // console.log('start, end', start);
      if (end - start < 1) {
          return false;
      }
      if (end - start === 1) {
          const ret = nums[start] === nums[end]
          return ret;
      }

      if (end - start === 2) {
          const ok = (nums[start] === nums[end] && nums[start] === nums[end - 1]) || (
              nums[start] + 1 === nums[start + 1] && nums[start + 1] + 1 === nums[end]
          );
          return ok;
      }

      if (memo.has(start)) {
        return memo.get(start);
      }

      const data = (isValid(start, start + 1) && isValid(start + 2, end)) ||
      (isValid(start, start + 2) && isValid(start + 3, end));
      memo.set(start, data);
      return data;
  }
  return isValid(0, nums.length - 1);
};
import { data2 } from './data';
console.log(validPartition(data2));
[
  813110, 813110, 813110_1,
   93730,  93730,  93730_2,
  757614, 757615, 757616_3,
  757617, 757618, 757619,
  757620, 757621, 757622,
  757623, 757624, 757625,
  757626, 757627
]