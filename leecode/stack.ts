import assert from "assert";
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const map = getNextGreaterMap(nums2);
  return nums1.map((item) => map[item]);
}
function getNextGreaterMap(list: number[]) {
  const data: { [key: number]: number } = {};
  let temp: number[] = [];
  for (let i = list.length - 1; i > -1; i--) {
    const item = list[i];
    while (item >= temp[0]) {
      temp.shift();
    }
    data[item] = temp.length > 0 ? temp[0] : -1;
    temp.unshift(item);
  }
  return data;
}

function nextGreaterElements(nums: number[]): number[] {
  let temp: number[] = [];
  const len = nums.length;
  const result: number[] = Array(len).fill(-1);
  for (let i = nums.length * 2 - 1; i > -1; i--) {
    const item = nums[i % len];
    while (temp.length && item >= temp[temp.length - 1]) {
      temp.pop();
    }
    if (i < len && temp.length > 0) {
      result[i] = temp[temp.length - 1];
    }
    temp.push(item);
  }

  return result;
}

function dailyTemperatures(T: number[]): number[] {
  const len = T.length;
  const result = Array(len).fill(0);
  let temp: number[] = [];
  for (let i = len - 1; i >= 0; i--) {
    while (temp.length > 0 && T[i] >= T[temp[temp.length - 1]]) {
      temp.pop();
    }
    result[i] = temp.length > 0 ? temp[temp.length - 1] - i : 0;
    temp.push(i);
  }
  return result;
}
class MaxQueue {
  private queue: [number, number][] = [];
  private max = 0;
  private size = 0;

  constructor(max: number) {
    this.max = max;
  }

  push(num: number) {
    this.size += 1;
    // 从后往前，以此删除比自己小的元素
    for (let i = this.queue.length - 1; i > -1; i--) {
      if (this.queue[i][0] <= num) {
        this.queue.pop();
      }
    }

    // 第一个元素越界了，直接推出
    if (this.queue.length > 0 && this.queue[0][1] <= this.size - this.max) {
      this.queue.shift();
    }

    this.queue.push([num, this.size]);
  }

  getMaxValue() {
    return this.queue[0][0];
  }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
  const queue = new MaxQueue(k);
  const result: number[] = [];
  for (let j = 0; j < k - 1; j++) {
    queue.push(nums[j]);
  }
  for (let i = 0; i < nums.length; i++) {
    if (i + k - 1 < nums.length) {
      queue.push(nums[i + k - 1]);
      result.push(queue.getMaxValue());
    }
  }
  return result;
}

interface StackItem {
  value: number;
  next?: StackItem;
}

class Stack {
  private head: StackItem = null;
  private size: number = 0;

  isEmpty() {
    return this.size === 0;
  }

  peek() {
    return this.head?.value;
  }

  push(value: number) {
    const head: StackItem = { value };
    head.next = this.head;
    this.head = head;
    this.size += 1;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const head = this.head;
    this.head = head ? head.next : null;
    head.next = null;
    this.size -= 1;
    return head.value;
  }
}

class MyQueue {
  private head: Stack;
  private tail: Stack;
  constructor() {
    this.head = new Stack();
    this.tail = new Stack();
  }

  push(x: number): void {
    this.head.push(x);
  }

  pop(): number {
    if (this.empty()) {
      return null;
    }

    this.isNeedMove();
    return this.tail.pop();
  }

  peek(): number {
    if (this.empty()) {
      return null;
    }
    this.isNeedMove();
    return this.tail.peek();
  }

  empty(): boolean {
    return this.head.isEmpty() && this.tail.isEmpty();
  }

  private isNeedMove() {
    if (!this.tail.isEmpty()) {
      return;
    }
    while (!this.head.isEmpty()) {
      this.tail.push(this.head.pop());
    }
  }
}

interface QueueType {
  value: number;
  next?: QueueType;
}
class QueueMock {
  private head: QueueType = null;
  private tail: QueueType = null;
  size = 0;
  push(value: number) {
    const item: QueueType = { value };
    if (!this.tail) {
      this.tail = item;
      this.head = item;
    } else {
      this.tail.next = item;
      this.tail = item;
    }
    this.size += 1;
  }

  empty() {
    return this.size === 0;
  }

  peak() {
    return this.head && this.head.value;
  }
  pop() {
    if (!this.head) {
      return null;
    }
    const head = this.head;
    this.head = head.next;
    this.size -= 1;
    head.next = null;
    if (!this.head) {
      this.tail = null;
    }
    return head.value;
  }
}

class MyStack {
  private q1: QueueMock;
  private q2: QueueMock;
  private last: number;
  constructor() {
    this.q1 = new QueueMock();
    this.q2 = new QueueMock();
  }

  push(x: number): void {
    if (!this.q1.empty()) {
      this.q1.push(x);
    } else {
      this.q2.push(x);
    }
    this.last = x;
  }

  pop(): number {
    if (this.empty()) {
      return null;
    }

    if (!this.q1.empty()) {
      return this.moveAndPop(this.q1, this.q2);
    } else {
      return this.moveAndPop(this.q2, this.q1);
    }
  }

  top(): number {
    return this.last;
  }

  empty(): boolean {
    return this.q2.empty() && this.q1.empty();
  }

  private moveAndPop(q1: QueueMock, q2: QueueMock) {
    if (q1.size === 1) {
      this.last = null;
      return q1.pop();
    }

    while(q1.size > 2) {
      q2.push(q1.pop());
    }
    this.last = q1.pop();
    q2.push(this.last);
    return q1.pop();
  }
}


assert.deepStrictEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [
  3,
  3,
  5,
  5,
  6,
  7,
]);

assert.deepStrictEqual(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]), [
  -1,
  3,
  -1,
]);

assert.deepStrictEqual(nextGreaterElements([1, 2, 1]), [2, -1, 2]);
assert.deepStrictEqual(nextGreaterElements([1, 2, 7, 5, 4, 1]), [
  2,
  7,
  -1,
  7,
  7,
  2,
]);

assert.deepStrictEqual(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [
  1,
  1,
  4,
  2,
  1,
  1,
  0,
  0,
]);
assert.deepStrictEqual(
  dailyTemperatures([89, 62, 70, 58, 47, 47, 46, 76, 100, 70]),
  [8, 1, 5, 4, 3, 2, 1, 1, 0, 0]
);
(() => {
  const queue = new MyQueue();
  queue.push(1);
  queue.push(2);
  queue.push(3);
  console.log(queue.peek());
  console.log(queue.pop());
  queue.push(4);
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.empty());
  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.empty());
});
(() => {
  const stack = new MyStack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log(stack.top());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.empty());
})();
console.log("run ok");
