export interface LinkedList {
  value: number;
  key: number;
  rate: number;
  next?: LinkedList;
  prev?: LinkedList;
}

export function createLinkList(
  val: number, key: number, rate: number,
  next?: LinkedList, prev?: LinkedList,
): LinkedList {
  return { value: val, key, rate, next, prev }
}

class LFUCache {
  private store: { [key: number]: LinkedList } = {};
  // 容量
  private capacity: number;
  // 缓存大小
  private size = 0;
  // 最少访问次数
  private minRate = 1;
  // 次数映射
  private rateMap: {
    [key: number]: {
      head: LinkedList;
      tail: LinkedList;
    };
  } = {};

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const item = this.store[key];
    if (!item) {
      return -1;
    }
    this.movePosition(item);
    return item.value;
  }

  private movePosition(item: LinkedList) {
    const rate = item.rate;
    // 第一步，删除当前节点位置
    // 第一个元素
    if (!item.prev) {
      // 只有一个元素
      if (!item.next) {
        this.rateMap[rate] = null;
        // 只有一个并且是最小的，最小频率随之加一
        if (this.minRate === rate) {
          this.minRate += 1;
        }
      } else {
        this.rateMap[rate].head = item.next;
        item.next.prev = null;
      }
    } else {
      if (item.next) {
        item.prev.next = item.next;
        item.next.prev = item.prev;
      } else {
        item.prev.next = null;
        this.rateMap[rate].tail = item.prev;
      }
    }

    // 第二步骤，移动到下一个频率节点
    item.rate = rate + 1;
    const rateItem = this.rateMap[rate + 1];
    if (!rateItem) {
      item.next = null;
      item.prev = null;
      this.rateMap[rate + 1] = {
        head: item,
        tail: item,
      };
    } else {
      // 放在队尾
      const { tail } = rateItem;
      rateItem.tail = item;
      item.next = null;
      tail.next = item;
      item.prev = tail.next;
    }
  }

  put(key: number, value: number): void {
    const old = this.store[key];
    if (old) {
      old.value = value;
      this.movePosition(old);
      return;
    }

    if (this.capacity < 1) { 
      return;
    }
    const link = createLinkList(value, key, 1);
    let rate = this.rateMap[1];

    // 数据存储
    this.store[key] = link;
    let size = this.size + 1;

    if (size > this.capacity) {
      this.cleanItem();
      size = size - 1;
      rate = this.rateMap[1];
    }

    this.size = size;

    // 位置信息初始化
    if (!rate) {
      this.rateMap[1] = {
        head: link,
        tail: link,
      };
      this.minRate = 1;
      return;
    }
    // 把新的链表元素放队尾
    const { tail } = rate;
    tail.next = link;
    link.prev = tail;
    rate.tail = link;
  }

  // 删除访问量最小的元素
  private cleanItem() {
    const item = this.rateMap[this.minRate];
    const { head } = item;
    const next = head.next;
    // 删除元素
    delete this.store[item.head.key];
    this.size -= 1;
    // 没有 next ，只有一个元素，直接清空节点
    if (!next) {
      this.rateMap[this.minRate] = null;
      return;
    }
    // 删除最小的元素
    item.head = next;
    next.prev = null;
    head.next = null;
  }
}

function runIt(list: Array<[number] | [number, number]>, lfu: LFUCache) {
  for (const item of list) {
    if (item.length === 1) {
      console.log('get ', item[0]);
      console.log(lfu.get(item[0]));
    } else {
      console.log('put ', item);
      lfu.put(item[0], item[1]);
    }
  }
}

(() => {
  const lfu = new LFUCache(10);
  runIt([[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]], lfu);
})();