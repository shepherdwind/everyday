function lengthOfLIS(nums: number[]): number {
  const dp: number[] = [1];
  let ret = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[j] + 1, (dp[i] || 0));
      }
    }

    if (!dp[i]) {
      dp[i] = 1;
    }

    ret = Math.max(ret, dp[i]);
  }
  return ret;
}


const gcd = function(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

console.log(lengthOfLIS([0,1,0,3,2,3]));