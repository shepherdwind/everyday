function pacificAtlantic(heights: number[][]): number[][] {
  const pacific = new PacificAtlantic(heights);
  return pacific.run();
};

class PacificAtlantic {
  heights: number[][];
  store: Set<string>;
  y: number;
  x: number;

  constructor(heights: number[][]) {
    this.heights = heights;
    this.y = heights.length;
    this.x = heights[0].length;
    this.store = new Set<string>();
  }

  run() {
    for (let i = 0; i < this.x; i++) {
      this.dfs(0, i, 'l');
      this.dfs(this.y - 1, i, 'r');
    }
    for (let j = 0; j < this.y; j++) {
      this.dfs(j, 0, 'l');
      this.dfs(j, this.x - 1, 'r');
    }

    const ret = [];
    for (let y = 0; y < this.y; y++) {
      for (let x = 0; x < this.x; x++) {
        const key = `${y}-${x}-`;
        if (this.store.has(key + 'l') && this.store.has(key + 'r')) {
          ret.push([y, x]);
        }
      }
    }

    return ret;
  }

  dfs(y: number, x: number, dest: 'l' | 'r') {
    const key = `${y}-${x}-${dest}`;
    if (this.store.has(key)) {
      return;
    }

    this.store.add(key);
    const v = this.heights;
    const item = v[y][x];
    if (y - 1 >= 0 && item <= v[y - 1][x]) this.dfs(y - 1, x, dest);
    if (y + 1 < this.y && item <= v[y + 1][x]) this.dfs(y + 1, x, dest);
    if (x - 1 >= 0 && item <= v[y][x - 1]) this.dfs(y, x - 1, dest);
    if (x + 1 < this.x && item <= v[y][x + 1]) this.dfs(y, x + 1, dest);
  }
}

const heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
console.log(pacificAtlantic(heights));
console.log(pacificAtlantic([[1,2,3],[8,9,4],[7,6,5]]));
