function solve(board: string[][]): void {
  const m = board.length;
  const n = board[0].length;
  for (let i = 0; i < n; i++) {
    const top = board[0][i];
    const last = board[m - 1][i];
    if (top === 'O') {
      markIt(board, 0, i);
    }
    if (last === 'O') {
      markIt(board, m - 1, i);
    }
  }

  for (let j = 1; j < m - 1; j++) {
    const top = board[j][0];
    const last = board[j][n - 1];
    if (top === 'O') {
      markIt(board, j, 0);
    }
    if (last === 'O') {
      markIt(board, j, n - 1);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const item = board[i][j];
      if (item === 'O') {
        board[i][j] = 'X';
      }
      if (item === '#') {
        board[i][j] = 'O';
      }
    }
  }
}

function markIt(board: string[][], i: number, j: number) {
  board[i][j] = '#';
  const m = board[0].length - 1;
  const n = board.length - 1;

  // 前后左右四个方向依次处理
  if (i > 0 && board[i - 1][j] === 'O') {
    markIt(board, i - 1, j);
  }
  if (i < n && board[i + 1][j] === 'O') {
    markIt(board, i + 1, j);
  }

  if (j > 0 && board[i][j - 1] === 'O') {
    markIt(board, i, j - 1);
  }
  if (j < m && board[i][j + 1] === 'O') {
    markIt(board, i, j + 1);
  }
}

class UF {
  private parents: {
    [key: string]: string;
  } = {};

  union(p: string, q: string) {
    if (this.connected(p, q)) {
      return true;
    }

    const pp = this.parents[p];
    const qp = this.parents[q];
    if (!pp && !qp) {
      this.parents[p] = q;
      this.parents[q] = q;
      return true;
    }
    if (pp && qp) {
      this.parents[pp] = this.getRoot(qp);
    }

    if (!pp && qp) {
      this.parents[p] = qp;
    }

    if (pp && !qp) {
      this.parents[q] = pp;
    }
    return true;
  }

  private getRoot(item: string) {
    let p = this.parents[item];
    while (p && p !== this.parents[p]) {
      p = this.parents[p];
    }
    return p;
  }

  connected(p: string, q: string) {
    const rootP = this.getRoot(p);
    if (!rootP) {
      return false;
    }
    return rootP === this.getRoot(q);
  }
}

function equationsPossible(equations: string[]): boolean {
  const uf = new UF();
  const unEquations: Array<[string, string]> = [];
  for (const item of equations) {
    const p = item[0];
    const q = item[3];
    const eq = item.slice(1, 3) === '==';
    // 等式，可以连接成功
    if (eq && !uf.union(p, q)) {
      return false;
    }
    // 不等式，不能有过关联关系
    if (!eq) {
      unEquations.push([p, q])
    }
  }
  for (const item of unEquations) {
    if (uf.connected(item[0], item[1]) || item[0] === item[1]) {
      return false;
    }
  }
  return true;
}

(() => {
  const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
  solve(board);
  console.log(board);
});

(() => {
  const ret = equationsPossible(["a==b","b!=c","c==a"]);
  console.log(ret);
})();