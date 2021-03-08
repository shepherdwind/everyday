class PQ<T> {
  private queue: T[] = [];
  private compare = (a: T, b: T) => {
    return a > b;
  }

  constructor(compare?: (a: T, b: T) => boolean) {
    if (compare) {
      this.compare = compare;
    }
  }

  insert(item: T) {
    this.queue.push(item);
    this.swim(this.size());
  }

  max() {
    return this.queue[0];
  }

  from(list: T[]) {
    for (const item of list) {
      this.insert(item);
    }
  }

  deleteMax() {
    this.exch(this.size(), 1);
    const max = this.queue.pop();
    this.sink();
    return max;
  }

  isEmpty() {
    return this.queue.length < 1;
  }

  size() {
    return this.queue.length;
  }

  private sink(index = 1) {
    let hasNext = false;
    do {
      const left = this.queue[index * 2 - 1];
      const right = this.queue[index * 2];
      const k = this.compare(right, left) ? index * 2 + 1 : index * 2;
      const max = this.compare(right, left) ? right: left;
      if (this.compare(max, this.queue[index - 1])) {
        this.exch(k, index);
        index = k;
        hasNext = true;
      } else {
        hasNext = false;
      }
    } while (index < this.size() && hasNext);
  }

  private swim(index: number) {
    let k = 0;
    let hasNext = false;
    do {
      k = Math.floor(index / 2);
      const item = this.queue[index - 1];
      const parent = this.queue[k - 1];

      if (this.compare(item, parent)) {
        this.exch(index, k);
        index = k;
        hasNext = true;
      } else {
        hasNext = false;
      }
    } while (index > 1 && hasNext);
  }

  private exch(target: number, dest: number) {
    let tmp = this.queue[target - 1];
    this.queue[target - 1] = this.queue[dest - 1];
    this.queue[dest - 1] = tmp;
  }
}

class MedianFinder {
  private pqTop = new PQ<number>((a, b) => b > a);
  private pqBottom = new PQ<number>();
  constructor() {
  }

  addNum(num: number): void {
    const top = this.pqTop.max();
    if (top < num) {
      this.pqTop.insert(num);
    } else {
      this.pqBottom.insert(num);
    }

    if (this.pqBottom.size() > this.pqTop.size() + 1) {
      this.pqTop.insert(this.pqBottom.deleteMax());
    }

    if (this.pqBottom.size() + 1 < this.pqTop.size()) {
      this.pqBottom.insert(this.pqTop.deleteMax());
    }
  }

  findMedian(): number {
    const top = this.pqTop.size();
    const bottom = this.pqBottom.size();
    if (bottom > top) {
      return this.pqBottom.max();
    } else if (top === bottom) {
      return (this.pqBottom.max() + this.pqTop.max()) / 2;
    } else {
      return this.pqTop.max();
    }
  }
}

(() => {
  const pq = new PQ<string>((a, b) => b > a);
  pq.from(['G', 'H', 'I', 'E', 'A', 'O', 'N', 'P', 'R', 'S', 'T']);
  while(pq.size()) {
    console.log(pq.deleteMax());
  }
});
(() => {
  const item = new MedianFinder();
  for (let i = 1; i <= 10; i++) {
    item.addNum(i);
  }
  console.log(item.findMedian());
})();