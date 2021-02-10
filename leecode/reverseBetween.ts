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
  if (m >= n) {
    return head;
  }

  let current = 1;
  let item = head;
  let reverseNode: ListNode;
  let last: ListNode;
  do {
    if (current === m) {
      reverseNode = item;
      item = item.next;
      current += 1;
      last = new ListNode(reverseNode.val);
      reverseNode.next = last;
      continue;
    }

    if (current > m && current < n) {
      const next = reverseNode.next;
      reverseNode.next = new ListNode(item.val, next);
    }

    if (current === n) {
      reverseNode.val = item.val;
      last.next = item.next;
      break;
    }
    // 下一个节点
    current += 1;
    item = item.next;
  } while (item);

  return head;
}

const head = createList(3, 5);
reverseBetween(head, 1, 2);
reverse(head);

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

function reverse(list: ListNode | null) {
  if (list) {
    console.log(list.val);
    reverse(list.next);
  }
}