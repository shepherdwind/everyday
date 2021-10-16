export class TwoOrThreeNode {
  left: TwoOrThreeNode;
  right: TwoOrThreeNode;
  value: number;
  parent: TwoOrThreeNode;
  middle: TwoOrThreeNode;
  mid: number;

  constructor(value: number) {
    this.value = value;
  }
}

export class TreeNodeManager {
  root: TwoOrThreeNode;
  insert(num: number) {
    if (!this.root) {
      this.root = new TwoOrThreeNode(num);
      return;
    }
    const node = this.find(num, this.root);
    if (!this.isThreeNode(node)) {
      this.twoToThree(node, num);
      return;
    }
    this.threeSplit(node, num);
  }

  private threeSplit(node: TwoOrThreeNode, num: number) {
    const { value, mid } = node;
    if (num < value) {
      const left = new TwoOrThreeNode(num);
      node.left = left;
      left.parent = node;

      delete node.mid;
      const right = new TwoOrThreeNode(mid);
      node.right = right;
      right.parent = node;
    } else if (num > mid) {
    }
  }

  private twoToThree(node: TwoOrThreeNode, n: number) {
    if (node.value < n) {
      node.mid = n;
      return;
    }

    let val = node.value;
    node.value = n;
    node.mid = val;
  }

  private isThreeNode(node: TwoOrThreeNode): boolean {
    return node.mid !== undefined;
  }

  private find(num: number, node: TwoOrThreeNode): TwoOrThreeNode {
    if (num < node.value) {
      return node.left ? this.find(num, node.left) : node;
    }

    if (this.isThreeNode(node)) {
      if (num < node.mid) {
        return node.middle ? this.find(num, node.middle) : node;
      }
    }

    if (num > node.value) {
      return node.right ? this.find(num, node.right) : node;
    }
  }
}