function minFallingPathSum(matrix: number[][]): number {
  const n = matrix.length;
  const temp: { [key: string]: number } = {};
  const dp = (i: number, j: number) => {
    const key = `${i}-${j}`;
    if (temp[key]) {
      return temp[key];
    }
    if (i + 1 > n) {
      return 0;
    }

    // 左边越界
    if (j < 0) {
      return Number.MAX_VALUE;
    }

    // 右边越界
    if (j + 1 > n) {
      return Number.MAX_VALUE;
    }

    const total = matrix[i][j] + Math.min(
      dp(i + 1, j + 1),
      dp(i + 1, j - 1),
      dp(i + 1, j),
    );
    console.log(`dp(%d,%d)=%d`, i, j, total);
    temp[key] = total;
    return total;
  };

  let ret = Number.MAX_VALUE;
  for (let j = 0; j < n; j++) {
    ret = Math.min(ret, dp(0, j));
  }
  return ret;
}

/*
const matrix = [[2,1,3],[6,5,4],[7,8,9]]
console.log(minFallingPathSum(matrix));
*/

function longestPalindromeSubseq(s: string): number {
  const memo = new Map<string, number>();
  const dp = (i: number, j: number) => {
    const key = `${i}-${j}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let ret = -1;
    if (i < 0 || i > j) {
      ret = 0;
    } else if (i === j) {
      ret = 1;
    } else if (j > s.length - 1) {
      ret = 0;
    }
    if (ret !== -1) {
      // console.log('dp(%d, %d) => %d', i, j, ret);
      memo.set(key, ret);
      return ret;
    }

    if (s[i] === s[j]) {
      ret = dp(i + 1, j - 1) + 2;
    } else {
      ret = Math.max(
        dp(i + 1, j),
        dp(i, j - 1),
      );
    }
    // console.log('dp(%d, %d) => %d', i, j, ret);
    memo.set(key, ret);
    return ret;
  };
  return dp(0, s.length - 1);
}

function longestPalindromeSubseq2(s: string): number {
  const dp = [];
  const n = s.length;
  const init = Array(n).fill(0);
  for (let i = 0; i < s.length; i++) {
    dp.push(init.slice());
    dp[i][i] = 1;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(
          dp[i + 1][j],
          dp[i][j - 1],
        );
      }
    }
  }
  // console.log(dp);
  return dp[0][s.length - 1];
}
// console.log(longestPalindromeSubseq2('euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew'));
// console.log(longestPalindromeSubseq2('bbbab'));

function pack(weigh: number, wt: number[], val: number[]) {
  const n = wt.length;
  const dp = (i: number, w: number) => {
    if (w < 0) {
      return -val[i - 1];
    }
    // 出界的情 
    if (i > n - 1) {
      return 0;
    }
    return Math.max(
      // 不选择 i
      dp(i + 1, w),
      // 选择 i
      dp(i + 1, w - wt[i]) + val[i],
    );
  }
  return dp(0, weigh);
}

function pack2(weight: number, wt: number[], val: number[]) {
  const n = wt.length;
  const init = Array(weight).fill(0);
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(init.slice());
  }

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= weight; j++) {
      const itemValue = val[i];
      const itemWight = wt[i];
      if (i === 0) {
        // 第一行，假设只有一个元素，是否选择元素，只取决于元素重量是否合适
        dp[i][j] = itemWight <= j ? itemValue : 0;
      } else {
        dp[i][j] = Math.max(
          // 重量足够才能选择
          j >= itemWight ? (itemValue + dp[i - 1][j - itemWight]) : 0,
          dp[i - 1][j],
        );
      }
    }
  }
  return dp[n - 1][weight];
}

console.log(pack2(4, [2, 1, 3], [4, 2, 3]));