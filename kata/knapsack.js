'use strict';
// 排序方式首先把items安value和size比例排序，从最比例最大的开始装
// 装到不能装为止
// 实现的比较啰嗦，对于reduce和取模运算理解不够，还是下面这个更好
// http://www.codewars.com/kata/reviews/54efb1bf8a3586097b0000b6/groups/54f0f213d491127c850006c3
function knapsack(capacity, items) {

  var sort = items.map(function(o, index) {
    return [o[1] / o[0], index];
  }).sort(function(a, b) {
    return b[0] - a[0];
  });

  var len = items.length;

  var boxs = Array(len + 1).join(0).split('').map(function(i) {
    return parseInt(i, 10);
  });

  var totalSize = 0;

  for (var i = 0; i < len; i++) {
    var index = sort[i][1];
    var size = items[index][0];
    while ((totalSize + size) <= capacity) {
      boxs[index] += 1;
      totalSize += size;
    }
  }

  return boxs;
}

module.exports = knapsack;
