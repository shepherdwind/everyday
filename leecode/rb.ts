import assert from 'assert';

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseBetween1(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head || !head.next) {
    return head;
  }
  const tmp = new ListNode(0, head);

  let left_point = tmp;
  let i = 1;
  while (i < left) {
    left_point = left_point.next;
    i += 1;
  }

  let current = left_point.next;
  let next: ListNode = current.next;
  let tail: ListNode = current;
  while (i < right) {
    i += 1;

    tail.next = next.next;
    next.next = current;
    left_point.next = next;

    current = left_point.next;
    next = tail.next;
  }
  return tmp.next;
};

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head || !head.next) {
    return head;
  }
  const tmp = new ListNode(0, head);

  let left_point = tmp;
  let i = 1;
  while (i < left) {
    left_point = left_point.next;
    i += 1;
  }

  let node1 = left_point.next;
  left_point.next = null;

  let node2 = node1.next;
  node1.next = null;
  let tail = node1;
  while (i < right) {
    i += 1;
    let node3 = node2.next;
    node2.next = node1;

    node1 = node2;
    node2 = node3;
  }

  left_point.next = node1;
  tail.next = node2;
  return tmp.next;
};

function createList(...list: number[]) {
  let head: ListNode;
  let item: ListNode;
  for (const i of list) {
    if (head) {
      item.next = new ListNode(i, null);
      item = item.next;
    } else {
      head = new ListNode(i);
      item = head;
    }
  }
  return head;
}

function walk(list: ListNode | null, fn: (item: ListNode) => any, ret: any[] = []) {
  if (list) {
    const item = fn(list);
    ret.push(item);
    const others = walk(list.next, fn);
    ret = ret.concat(others);
  }
  return ret;
}
(() => {
  const head = createList(1,2,3,4,5);
  const ret = reverseBetween(head, 3, 4);
  const end = walk(ret, item => item.val);
  assert.deepStrictEqual(end, [1,2,4,3,5]);
})();

(() => {
  const head = createList(1,2,3,4,5);
  const ret = reverseBetween(head, 2, 4);
  const end = walk(ret, item => item.val);
  assert.deepStrictEqual(end, [1,4,3,2,5]);
});

(() => {
  const head = createList(1, 2, 3, 4, 5, 6);
  const ret = reverseBetween(head, 1, 2);
  const end = walk(ret, item => item.val);
  console.log(end);
  assert.deepStrictEqual(end, [2, 1, 3, 4, 5, 6]);
  console.log(end);

  const ret1 = reverseBetween(createList(1, 2), 1, 1);
  const end1 = walk(ret1, item => item.val);
  assert.deepStrictEqual(end1, [1, 2]);

  const ret2 = reverseBetween(createList(1, 2), 1, 2);
  const end2 = walk(ret2, item => item.val);
  assert.deepStrictEqual(end2, [2, 1]);
})();