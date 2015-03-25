'use strict';
var knapsack = require('../../kata/knapsack');
describe('knapsack', function() {
  it('one item', function() {
    knapsack(100, [[1, 1]]).should.eql([100]);
    knapsack(100, [[100, 1]]).should.eql([1]);
  });

  it('Two items', function() {
    knapsack(100, [[1, 1], [3, 4]]).should.eql([1, 33]);
    knapsack(100, [[60, 80], [50, 50]]).should.eql([1, 0]);
  });

  it('Three items', function() {
    knapsack(100, [[10, 10], [30, 40], [56, 78]]).should.eql([1, 1, 1]);
    knapsack(100, [[11.2, 7.4], [25.6, 17.8],
      [51.0, 41.2], [23.9, 15.6], [27.8, 19.0]]).should.eql([2, 1, 1, 0, 0]);
  });
});
