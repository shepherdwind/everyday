function groupAnagrams(strs: string[]): string[][] {
  const store = new Map<string, string[]>();
  strs.forEach((item) => {
    const sorted = item.split(',').sort().join();
    const value = store.get(sorted) || [];
    value.push(item);
    store.set(sorted, value);
  });
  return Array.from(store.values());
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
