function reorganizeString(s: string): string {
  const store = new Map<string, number>();
  const queue = new Map<number, string[]>();

  for (let i = 0; i < s.length; i++) {
      const item = s[i];
      store.set(item, store.has(item) ? store.get(item) + 1 : 1);
  }

  const push = (num: number, c: string) => {
      if (num < 1) {
          return;
      }

      if (queue.has(num)) {
          queue.get(num).push(c);
      } else {
          queue.set(num, [c]);
      }
  }

  for (const c of store.keys()) {
      const num = store.get(c);
      push(num, c);
  }

  const getChar = (pre: string) => {
      let max = Math.max(...queue.keys());
      let item = queue.get(max);
      while (max > 0) {
          item = queue.get(max);
          if (!item) {
            max -= 1;
            continue;
          }

          const index = item.findIndex(o => o !== pre);
          if (index === -1) {
              max -= 1;
              continue;
          }

          const c = item[index];
          item.splice(index, 1);
          push(max - 1, c);
          if (!item.length) {
              queue.delete(max);
          }
          return c;
      }
  };

  let ret: string[] = [];
  let last: string;

  do {
      const c = getChar(last);
      last = c;
      last && ret.push(c);
  } while (last)

  return queue.size > 0 ? '' : ret.join('');
};

console.log(reorganizeString('vvvlo'));