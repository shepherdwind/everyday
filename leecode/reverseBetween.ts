import assert from 'assert';
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseBetween(
  head: ListNode | null,
  m: number,
  n: number
): ListNode | null {
  if (m === 1) {
    return reverseFront(head, n);
  }
  head.next = reverseBetween(head, m - 1, n - 1);
  return head;
}

function reverseFront(head: ListNode, m: number) {
  if (!head.next || m === 1) {
    return head;
  }

  const last = reverseFront(head.next, m - 1);
  const next = head.next.next;
  head.next.next = head;
  head.next = next;
  return last;
}

function reverseFrontWithM(head: ListNode, m: number): { node: ListNode, isEnd: boolean } {
  if (!head.next || m === 1) {
    return { node: head, isEnd: m === 1};
  }

  const { node: last, isEnd } = reverseFrontWithM(head.next, m - 1);
  const next = head.next.next;
  head.next.next = head;
  head.next = next;
  return { node: last, isEnd };
}
function reverseKGroup(head: ListNode, n: number) {
  if (!head || !head.next) {
    return head;
  }
  const { node: part, isEnd } = reverseFrontWithM(head, n);
  if (!isEnd) {
    // 重新翻转回来
    return reverseFrontWithM(part, n).node;
  }

  const next = reverseKGroup(head.next, n);
  head.next = next;
  return part;
}

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

function isPalindrome(head: ListNode | null): boolean {
  let left = head;
  const visit = (right: ListNode) => {
    if (!right) {
      return true;
    }
    const ret = visit(right.next);
    if (left.val !== right.val || !ret) {
      return false;
    }
    left = left.next;
    return true;
  };
  return visit(head);
};

(() => {
  const head = createList(1, 2, 3, 4, 5, 6);
  const ret = reverseBetween(head, 1, 2);
  const end = walk(ret, item => item.val);
  assert.deepStrictEqual(end, [2, 1, 3, 4, 5, 6]);
  console.log(end);

  const ret1 = reverseBetween(createList(1, 2), 1, 1);
  const end1 = walk(ret1, item => item.val);
  assert.deepStrictEqual(end1, [1, 2]);

  const ret2 = reverseBetween(createList(1, 2), 1, 2);
  const end2 = walk(ret2, item => item.val);
  assert.deepStrictEqual(end2, [2, 1]);
});

(() => {
  const head = createList(1, 2, 3, 4, 5, 6);
  const ret = reverseKGroup(head, 4);
  const end = walk(ret, item => item.val);
  console.log(end);
});

(() => {
  const head = createList(1, 2, 3, 4, 5, 6);
  assert.strictEqual(isPalindrome(head), false);
  const head1 = createList(1, 2, 3, 3, 2, 1);
  assert(isPalindrome(head1));
})();