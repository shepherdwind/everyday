'use strict';
var int32ToIp = require('../../kata/int32ToIp');
describe('int32ToIp', function() {
  it('basic', function() {
    int32ToIp(2149583361).should.eql('128.32.10.1');
  });
  it('zero', function() {
    int32ToIp(1).should.eql('0.0.0.1');
  });
});
