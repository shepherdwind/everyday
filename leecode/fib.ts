function fib(n: number, memo: number[] = []) {
  if (n <= 2) {
    return 1;
  }
  if (memo[n]) {
    return memo[n];
  }

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

function fib2(n: number)  {
  const dp: number[] = [];
  for (let i = 1; i <= n; i++) {
    dp[i] = i <= 2 ? 1 : dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// console.log(fib(50), fib2(50));

function coinChange(coins: number[], amount: number) {
  if (amount === 0) {
    return 0;
  }
  if (amount < 0) {
    return -1;
  }

  let res = Number.MAX_VALUE;
  for (const coin of coins) {
    const tmp = coinChange(coins, amount - coin);
    // amount - coin 无法满足条件
    if (tmp === -1) {
      continue;
    }
    res = Math.min(tmp + 1, res);
  }
  return res === Number.MAX_VALUE ? -1 : res;
}

function coinChange2(coins: number[], amount: number) {
  const dp: number[] = [0];
  for (let i = 1; i <= amount; i++) {
    dp[i] = findMinCoin(dp, coins, i);
  }
  return dp[amount];
}

function findMinCoin(dp: number[], coins: number[], amount: number) {
  let res = Number.MAX_VALUE;
  for (const coin of coins) {
    if (amount < coin || dp[amount - coin] === -1) {
      continue;
    }
    res = Math.min(res, dp[amount - coin] + 1);
  }
  return res === Number.MAX_VALUE ? -1 : res;
}

// console.log(coinChange([2, 5], 3));
// console.log(coinChange2([2, 5], 3));