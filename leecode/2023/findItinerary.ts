interface TreeNode {
  next: TreeNode[];
  value: string;
}

function findItinerary(tickets: string[][]): string[] {
  const treeMap = new Map<string, TreeNode>();

  const getNode = (key: string) => {
      let item = treeMap.get(key);
      if (!item) {
          item = { value: key, next: [] } as TreeNode;
          treeMap.set(key, item);
      }
      return item;
  }

  for (let i = 0; i < tickets.length; i++) {
      const [a, b] = tickets[i];
      const aNode = getNode(a);
      const bNode = getNode(b);
      
      aNode.next.push(bNode);
      aNode.next.sort((a, b) => a.value > b.value ? 1 : -1);
  }

  const ret = dfs(treeMap.get('JFK'), tickets.length);
  console.log(ret);
  return ['JFK'].concat(ret.map((o) => o.split('-')[1]));
};

function dfs(node: TreeNode, len: number, ret = []): string[] {
  if (ret.length > 7) {
    console.log(ret, ret.length);
  }
  if (!node || !node.next.length || ret.length === len) {
      return ret;
  }

  for (const item of node.next) {
      const path = `${node.value}-${item.value}`;
      if (ret.includes(path)) {
          continue;
      }
      const data = dfs(item, len, [...ret, path]);
      if (data?.length === len) {
          return data;
      }
  }
  return [];
}

function findItinerary2(tickets: string[][]): string[] {
  console.log(tickets);
  const adj = {};

  tickets.sort((a,b) => a[1] > b[1] ? -1 : 1);

  for (const ticket of tickets) {
      const [from, to] = ticket;

      if (adj[from]) {
          adj[from].push(to);
      } else {
          adj[from] = [to];
      }
  }
  console.log(adj);
  const it: string[] = [];
  function dfs(curr: string) {
      const to = adj[curr] || [];

      while (to.length > 0) {
          const next = to.pop();
          dfs(next);
      }
      
      it.unshift(curr);
  }

  dfs('JFK');

  return it;
};

console.log(findItinerary2([["JFK","KUL"],["JFK","NRT"],["KUL","JFK"]]))
// console.log(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]));
// console.log(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]));
// console.log(findItinerary([["EZE","AXA"],["TIA","ANU"],["ANU","JFK"],["JFK","ANU"],["ANU","EZE"],["TIA","ANU"],["AXA","TIA"],["TIA","JFK"],["ANU","TIA"],["JFK","TIA"]]));
