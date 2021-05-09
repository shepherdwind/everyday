// course-schedule
import assert from 'assert';

function canFinishV1(numCourses: number, prerequisites: number[][]): boolean {
  const linkMap = new Map<number, number[]>();
  const isConnected = (a: number, b: number) => {
    const cur = linkMap.get(a);
    if (a === b) {
      return true;
    }

    if (!cur) {
      return false;
    }

    return cur.some(item => isConnected(item, b));
  };

  for (const item of prerequisites) {
    const [a, b] = item;
    if (isConnected(a, b)) {
      return false;
    }
    const cur = linkMap.get(b) || [];
    cur.push(a);
    linkMap.set(b, cur);
  }

  return true;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const dep: number[][] = new Array(numCourses);
  const table: number[] = new Array(numCourses).fill(0);
  for (const item of prerequisites) {
    if (!dep[item[1]]) {
      dep[item[1]] = [];
    }

    dep[item[1]].push(item[0]);
    table[item[0]] += 1;
  }

  let task: number[] = [];
  let total = 0;

  do {
    table.forEach((o, idx) => {
      if (o === 0) {
        task.push(idx);
        table[idx] = -1;
        total += 1;
      }
    });

    if (!task.length) {
      return false;
    }

    while (task.length) {
      const item = task.pop();
      const depItem = dep[item] || [];
      for (const i of depItem) {
        table[i] -= 1;
      }
    }
  } while (total !== numCourses)

  return true;
}

(() => {
  const ret = canFinishV1(2, [[0, 1], [1, 2], [3, 4], [4, 1]]);
  assert(ret);
  assert.deepStrictEqual(canFinishV1(2, [[0, 1], [1, 2], [3, 4], [4, 0], [2, 4]]), false);
  const d1 = [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]];
  assert.deepStrictEqual(canFinishV1(20, d1), false);
});
(() => {
  const ret = canFinish(5, [[0, 1], [1, 2], [3, 4], [4, 1]]);
  assert(ret);
  assert.deepStrictEqual(canFinish(2, [[0, 1], [1, 2], [3, 4], [4, 0], [2, 4]]), false);
  const d1 = [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]];
  assert.deepStrictEqual(canFinish(20, d1), false);
})();