class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  next: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
  
  toJSON() {
    return [this.val, this.left, this.right, this?.next?.val];
  }
}

type TreeNodeItem = [number, number | TreeNodeItem, number | TreeNodeItem];
function createTree(items: TreeNodeItem) {
  const root = new TreeNode(items[0]);
  if (Array.isArray(items[1])) {
    root.left = createTree(items[1]);
  } else if (items[1] !== null) {
    root.left = new TreeNode(items[1]);
  }

  if (Array.isArray(items[2])) {
    root.right = createTree(items[2]);
  } else if (items[2] !== null) {
    root.right = new TreeNode(items[2]);
  }
  return root;
}

function invertTree(root: TreeNode | null) {
  if (!root) {
    return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

function connect(root: TreeNode | null): TreeNode | null {
  if (!root || !root.left) {
    return root;
  }
  root.left.next = root.right;
  connect(root.left);
  let right = root.right;
  if (right) {
    right.next = root.next ? root.next.left : null;
  }
  connect(root.right);
  return root;
}

// let left: TreeNode;
function flatten(root: TreeNode | null): void {
  if (!root) {
    return;
  }
  flatten(root.left);
  flatten(root.right);
  const left = root.left;
  const right = root.right;
  root.left = null;
  root.right = left;
  let end = root;
  while (end.right) {
    end = end.right;
  }
  end.right = right;
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const [max, index] = getMax(nums);
  if (!nums || !nums.length) {
    return null;
  }
  const len = nums.length;
  const node = new TreeNode(max);
  if (len === 1) {
    return node;
  }

  node.left = constructMaximumBinaryTree(nums.slice(0, index));
  node.right = constructMaximumBinaryTree(nums.slice(index + 1, len));
  return node;
};

function getMax(nums: number[]) {
  let max = nums[0];
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (item > max) {
      max = item;
      index = i;
    }
  }
  return [max, index];
}

/*
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length <= 1) {
    return !preorder.length ? null : new TreeNode(preorder[0]);
  }

  const rootVal = preorder.shift();
  const root = new TreeNode(rootVal);
  const index = inorder.indexOf(rootVal);
  root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index));
  root.right = buildTree(preorder.slice(index), inorder.slice(index + 1))
  return root;
}
*/

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  if (inorder.length < 1) {
    return null;
  }

  const rootVal = postorder.pop();
  const root = new TreeNode(rootVal);
  const index = inorder.indexOf(rootVal);
  root.right = buildTree(inorder.slice(index + 1), postorder)
  root.left = buildTree(inorder.slice(0, index), postorder);
  return root;
}


const map = new Map<string, number>();
function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  map.clear();
  const ret: TreeNode[] = [];
  helpUid(root, ret);
  return ret;
}

function helpUid(root: TreeNode | null, ret: TreeNode[]) {
  if (root === null) {
    return '#';
  }

  const left = helpUid(root.left, ret);
  const right = helpUid(root.right, ret);
  const uid = `(${left},${root.val},${right})`;
  const item = map.get(uid);
  if (!item) {
    map.set(uid, 1);
  } else if (item === 1) {
    ret.push(root);
    map.set(uid, item + 1);
  }
  return uid;
}

function kthSmallest(root: TreeNode | null, k: number): number {
  return help(root, k)[k - 1];
}

function help(root: TreeNode | null, k: number, ret: number[] = []) {
  if (!root) {
    return null;
  }

  help(root.left, k, ret);
  ret.push(root.val);

  if (ret.length >= k) {
    return ret;
  }

  help(root.right, k, ret);
  return ret;
}

let total = 0;
function convertBST(root: TreeNode | null): TreeNode | null {
  total = 0;
  helpConvert(root);
  return root;
}

function helpConvert(root: TreeNode | null) {
  if (!root) {
    return;
  }
  helpConvert(root.right);
  root.val += total;
  total = root.val;
  helpConvert(root.left);
}

function isValidBST(root: TreeNode | null): boolean {
  const info = helpValid(root);
  return info.isValid;
}

function helpValid(root: TreeNode): { isValid: boolean; max?: TreeNode; min?: TreeNode } {
  if (!root) {
    return { isValid: true };
  }

  const left = helpValid(root.left);
  const right = helpValid(root.right);

  // 有一个失败了，那么整体就不符合条件了
  if (!left.isValid || !right.isValid) {
    // 有一个不符合条件，直接退出
    return { isValid: false };
  }

  // 左边的最大值，必须小于 root 节点
  if (left.max && left.max.val >= root.val) {
    return { isValid: false };
  }
  // 右边的最小值，必须大于 root 节点
  if (right.min && right.min.val <= root.val) {
    return { isValid: false };
  }
  return {
    isValid: true,
    max: right.max || root.right || root,
    min: left.min || root.left || root,
  };
}

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let item = root;
  while (item) {
    if (item.val === val) {
      return item;
    }

    if (item.val > val) {
      item = item.left;
    } else {
      item = item.right;
    }
  }
  return null;
}

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    return new TreeNode(val);
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
}


function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) {
    return null;
  }

  if (root.val !== key) {
    if (root.val < key) {
      root.right = deleteNode(root.right, key);
    } else {
      root.left = deleteNode(root.left, key);
    }
    return root;
  }

  return mergeNode(root.left, root.right);
}

function mergeNode(left: TreeNode | null, right: TreeNode) {
  if (!right) {
    return left;
  }
  let node = right;
  let p: TreeNode = null;
  while (node.left) {
    p = node;
    node = node.left;
  }

  node.left = left;
  if (p) {
    p.left = node.right;
    node.right = right;
  }

  return node;
}

(() => {
  // const ret = connect(createTree([1, [2, 4, 5], [3, 6, 7]]));
  // console.log(ret.toJSON());

  const ret1 = connect(createTree([-1, [0, [2, 6, 7], [3, 8, 9]], [1, [4, 10, 11], [5, 12, 13]]]));
  console.log(ret1);
});
(() => {
  const ret = flatten(createTree([1, [2, 3, 4], [5, null, 6]]));
  console.log(ret);
});
(() => {
  const ret = constructMaximumBinaryTree([3,2,1,6,0,5]);
  console.log(ret);
});

(() => {
  const ret = buildTree([1, 2, 3], [3, 2, 1]);
  console.log(ret);
});

(() => {
  // const ret = findDuplicateSubtrees(createTree([1, [2, 4, null], [3, [2, 4, null], 4]]));
  // console.log(ret);
  const ret1 = findDuplicateSubtrees(createTree([0, [0, 0, null], [0, null, [0, null, 0]]]));
  console.log(ret1);
});

(() => {
  const ret = kthSmallest(createTree([5, [3, [2, 1, null], 4], 6]), 2);
  console.log(ret);
});

(() => {
  const ret = convertBST(createTree([4,[1, 0, [2, null, 3]], [6, 5, [7, null, 8]]]));
  console.log(ret);
});
(() => {
  const ret = isValidBST(createTree([1, 1, null]));
  console.log(ret);
});
(() => {
  const ret = deleteNode(createTree([5, [3, 2, 4], [7, 6, 8]]), 7);
  console.log(ret);
})();