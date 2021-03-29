import { run } from "./run";
import assert from "assert";

interface MaxItemData {
  data: number[];
  start?: number;
  end?: number;
}
class MaxItem {
  private store: MaxItemData[] = [];
  private map: {
    [key: number]: {
      prev: MaxItemData;
      next: MaxItemData;
    };
  } = {};

  constructor(N: number) {
    const first = [];
    for (let i = 0; i < N; i++) {
      first.push(i);
    }
    this.store.push({ data: first });
  }

  last() {
    return this.store[0];
  }

  split(index: number) {
    // 第一个元素取出来
    const last = this.store.shift();
    const item = last.data[index];
    const left = { data: last.data.slice(0, index), end: item, start: last.start };
    const right = { data: last.data.slice(index + 1), start: item, end: last.end };
    if (left.data.length) {
      this.store.push(left);
    }
    if (right.data.length) {
      this.store.push(right);
    }

    // 被截断以后，前面部分被拆分成两端，保留 right 部分
    if (this.map[last.end]) {
      this.map[last.end].prev = right;
    }

    // 被截断，第一个元素是起点，那么后面部分被拆分两端，留下前面一段
    if (this.map[last.start]) {
      this.map[last.start].next = left;
    }

    this.map[item] = {
      prev: left,
      next: right,
    };
    this.sortStore();
  }

  deleteItem(item: number) {
    if (!this.map[item]) {
      return null;
    }
    const { prev, next } = this.map[item];
    // 删除元素
    this.store = this.store.filter((o) => o !== prev && o !== next);
    this.store.push({
      data: prev.data.concat(next.data),
      start: prev.start,
      end: prev.end,
    });
    this.sortStore();
    delete this.map[item];
  }

  private sortStore() {
    this.store.sort((a, b) => {
      const diff = Math.floor((b.data.length - 1) / 2) - Math.floor((a.data.length - 1) / 2);
      if (!diff) {
        return a[0] - b[0];
      }
      return diff;
    });
  }
}

class ExamRoom {
  private max: number;
  private store: MaxItem;

  constructor(N: number) {
    this.max = N - 1;
    this.store = new MaxItem(N);
  }

  seat(): number {
    const store = this.store.last().data;
    const top = store[0];
    if (top === 0) {
      store.shift();
      return 0;
    }
    const last = store[store.length - 1];
    if (last === this.max) {
      store.pop();
      return last;
    }
    const mid = Math.floor((store.length - 1) / 2);
    this.store.split(mid);
    return store[mid];
  }

  leave(p: number): void {
    return this.store.deleteItem(p);
  }
}

(() => {
  // 链接：https://leetcode-cn.com/problems/exam-room
  const ret = run(
    ["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"],
    [[10], [], [], [], [], [4], []],
    { ExamRoom }
  );
  assert.deepStrictEqual(ret, [null, 0, 9, 4, 2, null, 5]);
})();
