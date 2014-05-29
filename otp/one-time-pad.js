/**
 * one-time pad: OTP 实现
 * http://en.wikipedia.org/wiki/One-time_pad
 */

var charset = '';

/**
 * 获得某一段数字之间的所有符号
 */
function getChars(len, start){
  start = +start || 0
  len = start + len
  var chars = []
  for (var i = start; i < len; i++) {
    chars.push(String.fromCharCode(i))
  }
  return chars
}

/**
 * 补全长度
 * xx => 00xx
 */
function pad(input, len) {
  input = '' + input
  if (input.length < len) {
    return pad('0' + input, len)
  } else {
    return input
  }
}

function encrypt(text, password){
  var buf = new Buffer(text);
  var bufp = new Buffer(password);
  var ret = new Buffer(buf.length);
  for (var i=0; i < buf.length; i++) {
    console.log(buf[i].toString(2))
    console.log(bufp[i].toString(2))
    ret[i] = buf[i] ^ bufp[i];
    console.log(ret[i].toString(2))
  }
  return ret;
}

exports.pad = pad;
exports.getChars = getChars;
