'use strict';
function int32ToIp(int32) {
  var ip = [];
  while(int32 > 256) {
    ip.unshift(int32 - (int32 = int32 >>> 8) * 256);
  }

  ip.unshift(int32);
  while (ip.length < 4) {
    ip.unshift(0);
  }

  return ip.join('.');
}

// most easy code
function int32ToIp2 (int32) {
  return [
    (int32 >> 24) & 0xFF,
    (int32 >> 16) & 0xFF,
    (int32 >>  8) & 0xFF,
    (int32) & 0xFF
  ].join('.');
}

module.exports = int32ToIp2;
