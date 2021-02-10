// 暴力解法，太慢了
function lengthOfLongestSubstring (input) {
  const store = { len: 0, data: {}, max: 0 };
  for (let i = 0; i < input.length; i++) {
    if (store.data[input[i]] !== true) {
      store.data[input[i]] = true;
      store.len += 1;
    } else {
      // 遇到重复的情况，存贮最大值
      store.max = Math.max(store.len, store.max);
      // i 重新退回
      i = i - store.len + 1;
      // 重试初始化一次匹配
      store.len = 1;
      store.data = { [input[i]]: true };
    }
  }

  return Math.max(store.len, store.max);
}

// 滑动窗口
function lengthOfLongestSubstring2 (input) {
  // 窗口
  const box = [];
  let emptyIndex = 0;

  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (box.includes(item)) {
      // 弹出第一个
      box.shift();
      // 尾部塞入一个空对象
      box.pop(null);
      emptyIndex += 1;
    }
    
    let last = box.length - 1;

    // 窗口中存在，直接进入下一步
    if (box.includes(item)) {
      continue;
    }

    if (box[last] = null) {
      box[last - emptyIndex - 1] = item;
    } else {
      box.push(item);
    }
  }
}
// const data1 = lengthOfLongestSubstring2('abcabcbb');
// const data2 = lengthOfLongestSubstring2('qrsvbspk');
const data4 = lengthOfLongestSubstring2(" ");
const data3 = lengthOfLongestSubstring2("dvdf");
console.log(data3);