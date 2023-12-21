interface Item {
  n: number;
  value: string;
}
function isValidSerialization(preorder: string): boolean {
  const list: Item[] = [];
  if (preorder === '#') {
      return true;
  }
  const items = preorder.split(',');
  let i = 0;
  for (; i < items.length; i++) {
      const item = items[i];
      const prev = list[list.length - 1];
      if (!prev && item == '#') {
          return false;
      }

      if (prev) {
          prev.n -= 1;
          if (!prev.n) {
              list.pop();
          }
      }

      if (item !== '#') {
          list.push({
              n: 2,
              value: item,
          });
      }

      if (item === '#' && !list.length) {
        break;
      }
  }
  return i === items.length - 1;
};
console.log(isValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#"));
console.log(isValidSerialization("9,3,4,#,#,1,#,#,#,2,#,6,#,#"));
// console.log(isValidSerialization("1,#,#,#,#"));