/**
 * vhd写入，暂时hello.out是512，直接写到文件头部就可以了
 *
 */
'use strict';

var fs = require('fs');
var buf = fs.readFileSync('./hello.out');
var fp = fs.openSync('./learn\ asm.vhd', 'r+');
fs.writeSync(fp, buf, 0, buf.length);
fs.closeSync(fp);
console.log('ok');
