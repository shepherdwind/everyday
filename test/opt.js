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

var text = "hello world"
var password = "this is password"
console.log(new Buffer(text).toString('base64'))
var ret = opt.encrypt(text, password)
console.log(ret)

var decode = opt.encrypt(ret, password, true)
console.log(decode)
//console.log(new Buffer(decode, "base64").toString())
