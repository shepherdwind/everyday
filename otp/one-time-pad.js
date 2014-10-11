/**
 * one-time pad: OTP 实现
 * http://en.wikipedia.org/wiki/One-time_pad
 */

var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
var charsets = charset.split('')

/**
 * 获得某一段数字之间的所有符号
 */
function getChars(len, start){
  start = +start || 0
  len = start + len
  var chars = new Buffer(len)
  for (var i = start; i < len; i++) {
    chars[i] = fromCharCode(i)
  }
  return chars
}

/**
 */
function pad(text, password) {
  var index1 = charset.indexOf(text)
  var index2 = charset.indexOf(password)
  var len = charset.length
  console.log([index1, index2])
  console.log([text, password, charset[(index1 + index2) % len]])
  return charset[(index1 + index2) % len]
}

/**
 * 密码长度和text保持一致
 */
function equalLen(text, password) {
  var times = Math.ceil(text.length / password.length)
  return Array(times + 1).join(password)
}

function encrypt(text, password, isBase64){
  if (!isBase64) {
    text = new Buffer(text).toString('base64')
  }

  password = new Buffer(password).toString('base64')
  password = equalLen(text, password)

  var len = text.length
  var i = 0
  var ret = ''
  while(i !== len) {
    ret += pad(text[i], password[i])
    i ++
  }

  return ret
}

exports.encrypt = encrypt
