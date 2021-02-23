class NestedInteger {
  private list: NestedInteger[];
  private value: number;

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

class NestedIterator {
  constructor(nestedList: NestedInteger[]) {
  }

  hasNext(): boolean {
  }

  next(): number {
  }
}

