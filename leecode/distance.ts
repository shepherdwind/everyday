

function minDistance(word1: string, word2: string): number {
  const n = word1.length;
  const m = word2.length;
  const maxValue = Math.max(n, m)

  const dp: number[][] = [];

  const init = Array(m + 1).fill(0);
  for (let i = 0; i <= n; i++) {
    dp.push(init.slice());
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = Math.max(i, j);
        continue;
      }

      const rightTop = j === 0 ? maxValue : dp[i][j - 1];
      const left = i === 0 ? maxValue : dp[i - 1][j];
      const leftTop = (i > 0 && j > 0) ? dp[i - 1][j - 1] : maxValue;
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = leftTop;
      } else {
        dp[i][j] = Math.min(left, rightTop, leftTop) + 1;
      }
    }
  }
  // console.log(dp);
  return dp[n][m];
}

console.log(minDistance("zoologicoarchaeologist", "zoogeologist"));