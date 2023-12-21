import assert from "assert";
import { run } from "../run";

interface TrieNode {
  children: TrieNode[];
  value: string;
  isEnd: boolean;
}

export class Trie {
  #root: TrieNode;
  constructor() {
      this.#root = this.#createItem('');
  }

  #createItem(v: string) {
      return {
          children: [] as TrieNode[],
          value: v,
          isEnd: false,
      }
  }

  insert(word: string): void {
    let node = this.#root;

    for (let i = 0; i < word.length; i++) {
        const w = word[i];
        const index = node.children.findIndex(o => o.value === w);
        if (index > -1) {
            node = node.children[index];
        } else {
            const newNode = this.#createItem(w);
            node.children.push(newNode);
            node = newNode;
        }
    }
    node.isEnd = true;
  }

  #searchItem(word: string) {
    let node = this.#root;
    
    for (let i = 0; i < word.length; i++) {
        const w = word[i];
        const index = node.children.findIndex(o => o.value === w);
        if (index === -1) {
            return null;
        }
        node = node.children[index];
    }
    return node;
  }

  search(word: string): boolean {
      const item = this.#searchItem(word);
      if (!item) {
          return false;
      }
      return item.isEnd;
  }

  startsWith(prefix: string): boolean {
      const item = this.#searchItem(prefix);
      return item !== null;
  }
}

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/

(() => {
  // 链接：https://leetcode-cn.com/problems/exam-room
  const ret = run(
    ["Trie","insert","search","search","startsWith","insert","search"],
    [[],["apple"],["apple"],["app"],["app"],["app"],["app"]],
    { Trie }
  );
  assert.deepStrictEqual(ret, [null,null,true,false,true,null,true]);
})();