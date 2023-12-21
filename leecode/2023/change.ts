function change(amount: number, coins: number[], cache?: Map<string, number>): number {
  if (!cache) {
    coins.sort((a, b) => a - b);
  }

  cache = cache || new Map();
  const key = `${amount}-${coins.length}`;
  if (cache.has(key)) {
    return cache.get(key)
  }

  const dp = new Map<number, number>();
  if (!amount) {
      return 1;
  }
  if (!coins.length) {
      return 0;
  }

  const coin = coins[0];
  // select coins[0]
  for (let i = coin; i <= amount; i++) {
      if (i === coin) {
          dp.set(i, 1);
          continue;
      }

      dp.set(i, (dp.get(i - coin) || 0) + change(i, coins.slice(1), cache));
  }

  const ret = dp.get(amount) || 0;
  cache.set(key, ret);
  return ret;
};

// console.log(change(5, [1, 2, 5]));
// console.log(change(100, [99,1]));
// console.log(change(500, [1,2,5]));
// console.log(change(5000, [4001,4002,4003,4004,4005]));

console.log(change(100, [3,5,7,8,9,10,11]));