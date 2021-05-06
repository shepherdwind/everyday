// https://leetcode-cn.com/problems/course-schedule/
import assert from 'assert';

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const linkMap = new Map<number, number[]>();
  const isConnected = (a: number, b: number) => {
    const cur = linkMap.get(a);
    if (a === b) {
      return true;
    }

    if (!cur) {
      return false;
    }

    return cur.some(item => {
      return item === b || isConnected(item, b);
    });
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

(() => {
  const ret = canFinish(2, [[0, 1], [1, 2], [3, 4], [4, 1]]);
  assert(ret);
  assert.deepStrictEqual(canFinish(2, [[0, 1], [1, 2], [3, 4], [4, 0], [2, 4]]), false);
  const d1 = [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]];
  assert.deepStrictEqual(canFinish(20, d1), false);
})();