function minimumDeviation(nums: number[]): number {
  const len = nums.length;

  if (len < 2) {
      return 0;
  }

  for (let i = 0; i < len; i++) {
      if (nums[i] % 2 === 1) {
          nums[i] = nums[i] * 2;
      }
  }

  // console.log(nums);
  nums.sort((a, b) => b - a);
  let diff = nums[0] - nums[len - 1];
  let cache: number[] = [];
  while (true) {
    if (nums[0] % 2 || !diff) {
      break;
    }
    // splitAndInsert(nums);
    const r = popAndCache(nums, cache);
    nums = r[0];
    cache = r[1];
    // nums.sort((a, b) => b - a);
    diff = Math.min(nums[0] - nums[nums.length - 1], diff);
  }
  return diff;
}

function popAndCache(nums: number[], cache: number[]) {
  const first = nums.shift() / 2;
  cache.push(first);
  if (cache[0] > nums[0] || cache[cache.length - 1] < nums[nums.length - 1]) {
    return [nums.concat(cache).sort((a , b) => b - a), []];
  }
  return [nums, cache];
}

export const splitAndInsert = (data: number[]) => {
  const first = data.shift() / 2;
  let low = data.length - 1;
  let high = 0;
  if (first > data[high]) {
    data.unshift(first);
    return data;
  }

  if (first < data[low]) {
    data.push(first);
    return data;
  }

  while (low > high + 1) {
    // [6,4], 2
    const mid = Math.floor((high + low) / 2);
    if (data[mid] > first) {
      high = mid;
    } else if (data[mid] < first) {
      low = mid;
    } else {
      low = mid;
      break;
    }
  }
  const index = first > data[high] ? high : low;
  // insert into array
  data.splice(index, 0, first);
  console.log('insert ', index, data);
  return data;
}

// console.log(splitAndInsert([16,9,7,5]));
// console.log(splitAndInsert([22,9,7,5]));

// console.log(minimumDeviation([900,241,842,374,758,39,687,242,912]));
// console.log(minimumDeviation([3,5]));
// console.log(minimumDeviation([9,4,3,6,2]));
console.log(minimumDeviation([4,1,5,20,3]));
import { data } from './data';
console.log(minimumDeviation(data))
