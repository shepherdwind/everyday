export interface LinkedList {
  value: number;
  key: number;
  next?: LinkedList;
  prev?: LinkedList;
}

function createLinkList(val: number, key: number, next?: LinkedList, prev?: LinkedList): LinkedList {
  return { value: val, key, next, prev }
}

class LRUCache {
  private capacity: number;
  private size = 0;
  private hashStore: { [key: number]: LinkedList } = {};
  private head: LinkedList;
  private tail: LinkedList;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const item = this.hashStore[key];
    if (!item) {
      return - 1;
    }

    this.movePosition(item);
    return item.value;
  }

  private movePosition(item: LinkedList) {
    if (item === this.tail) {
      return;
    }

    // 前面还有，并且不是 tail ，调整位置到最后面
    if (item.prev) {
      item.prev.next = item.next;
      item.next.prev = item.prev;
    } else {
      // 如果 item 是第一个，修改 head，并且清理引用
      this.head = item.next;
      item.next.prev = null;
    }

    this.tail.next = item;
    item.prev = this.tail;
    this.tail = item;
  }

  put(key: number, value: number): void {
    const old = this.hashStore[key];
    if (old) {
      old.value = value;
      this.movePosition(old);
      return;
    }

    const link = createLinkList(value, key);
    if (!this.tail && !this.head) {
      this.tail = link;
      this.head = link;
    } else {
      const tail = this.tail;
      tail.next = link;
      link.prev = tail;
      this.tail = link;
    }

    let size = this.size + 1;
    if (size > this.capacity) {
      const head = this.head;
      this.head = head.next;

      head.next.prev = null;
      head.next = null;
      size = this.size;
      // 删除 head 的值
      delete this.hashStore[head.key];
    }
    this.size = size;
    this.hashStore[key] = link;
  }
}

(() => {
  const lRUCache = new LRUCache(2);
  lRUCache.put(1, 1); // 缓存是 {1=1}
  lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
  console.log(lRUCache.get(1));    // 返回 1
  lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
  console.log(lRUCache.get(2));    // 返回 -1 (未找到)
  lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
  console.log(lRUCache.get(1));    // 返回 -1 (未找到)
  console.log(lRUCache.get(3));    // 返回 3
  console.log(lRUCache.get(4));    // 返回 4
});

(() => {
  const lru = new LRUCache(2);
  lru.put(2, 1);
  lru.put(1, 1);
  lru.put(2, 3);
  lru.put(4, 1);
  console.log(lru.get(1));
  console.log(lru.get(2));
})();