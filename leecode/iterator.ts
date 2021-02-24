type List = number | List[];
class NestedInteger {
  private list: NestedInteger[];
  private value: number;

  static from(list: List[]) {
    return list.map(o => {
      if (typeof o === 'number') {
        return new NestedInteger(o);
      }
      const item = new NestedInteger();
      item.list = NestedInteger.from(o);
      return item;
    });
  }

  constructor(value?: number) {
    if (Number.isInteger(value)) {
      this.value = value;
    } else {
      this.list = [];
    }
  }

  // 如果其中存的是一个整数，则返回 true，否则返回 false
  isInteger(): boolean {
    return Number.isInteger(this.value);
  }

  // 如果其中存的是一个整数，则返回这个整数，否则返回 null
  getInteger(): number {
    return this.isInteger() ? this.value : null;
  }

  // 如果其中存的是一个列表，则返回这个列表，否则返回 null
  getList(): NestedInteger[] {
    return this.isInteger() ? null : this.list;
  }
}
class LinkList {
  val: number;
  next: LinkList | null;
  constructor(val?: number, next?: LinkList| null) {
    this.val = val;
    this.next = next || null;
  }
}

function transForm(nestedList: NestedInteger[]): LinkList {
  if (!nestedList || !nestedList.length) {
    return null;
  }
  const item = nestedList.shift();
  let root: LinkList;
  if (item.isInteger()) {
    root = new LinkList(item.getInteger());
  } else {
    root = transForm(item.getList());
  }

  if (!root) {
    return transForm(nestedList);
  }

  let end = root;
  while (end.next) {
    end = end.next;
  }
  end.next = transForm(nestedList);
  return root;
}

class NestedIterator {
  private linkList: LinkList;
  constructor(nestedList: NestedInteger[]) {
    this.linkList = transForm(nestedList);
  }

  hasNext(): boolean {
    return this.linkList !== null;
  }

  next(): number {
    const item = this.linkList;
    this.linkList = item.next;
    return item.val;
  }
}

(() => {
  const data = NestedInteger.from([[1,2],3,[4,5]]);
  console.log(transForm(data));
})();

