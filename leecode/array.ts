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
(() => {
  const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
  solve(board);
  console.log(board);
})();