/**!
 * opt tester
 *
 * Copyright(c) Eward.song Limited.
 * MIT Licensed
 *
 * Authors:
 *   Eward <eward.song@gmail.com> (http://shepherdwind.com)
 */

var assert = require('assert')
var opt = require('../otp/one-time-pad')
var pad = opt.pad
var getChars = opt.getChars

describe('OTP', function() {

  describe('basic', function() {
    it('pad work', function() {
      assert.strictEqual('0111', pad(111, 4))
      assert.strictEqual('0001', pad(1, 4))
      assert.strictEqual('1111', pad(1111, 4))
      assert.strictEqual('0031', pad(31, 4))
    })

    it('getChars', function() {
      var ascii = getChars(255)
      assert.equal(255, ascii.length)
      assert.equal('\u0065', ascii[0x65])
      assert.equal('\u0015', ascii[0x15])
    })
  })
  
})
