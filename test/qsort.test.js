'use strict';

const qsort = require('../cs/qsort/qsort');

describe('test/qsort.test.js', function() {
  it('normal', function() {
    const ret = qsort([6, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 1, 50, 48]);
    console.log(ret);
  });
});
