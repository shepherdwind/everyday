/**
 * 开房数据库中搜索出浙江、并且有电话号码的用户
 */

'use strict';

var fs = require('fs');
var path = require('path');
var shelljs = require('shelljs');
var fmt = require('util').format;
var ProgressBar = require('progress');

// 完成的任务
var processed = 0;

read('./2000W/1000W-1200W.csv', './result.txt', parse);

function getSize(filename) {
  var ret = shelljs.exec(fmt("ls -l %s | awk '{ print $5 }'", filename), { silent: true });
  var number = parseInt(ret.output, 10);
  return parseInt(number);
}

function progress(filename) {
  // 文件总长度
  var totalLen = getSize(filename);
  // 每一步完成100次读取，每次读取65536长度字符串
  var step = 65536 * 100;

  // 进度条
  var bar = new ProgressBar('Process [:bar] :elapseds spend, left :etas', {
    total: Math.ceil(totalLen / step)
  });
  return bar;
}

function read(filename, dest, fn){
  // 开始处理时间;
  var t = Date.now();
  var reader = fs.createReadStream(filename);
  var writer = fs.createWriteStream(dest);
  var bar = progress(filename);

  // 数据条数;
  var rowNum = 0;
  var end = '';

  reader.on('data', function(buf){

    buf = end + buf.toString();
    var lines = buf.split('\n');
    var len = lines.length;
    end = lines[len - 1];

    rowNum += len;

    writer.write(fn(lines));
    processed += 1;

    if (processed % 100 === 0) {
      bar.tick();
    }

  });

  reader.on('end', function(){
    bar.tick();
    console.log('finish, cost: %sms, count: %s', Date.now() - t, rowNum);
  });
}

function parse(lines){
  var len = lines.length;
  var ret = '';
  lines.forEach(function(line){
    line = line.split(',').map(function(l){
      return l.trim();
    });
    // 没有电话号码的
    var fit = (line[20] || line[19]) && line[4].indexOf('33') === 0 && line[7];
    if (fit) {
      // 姓名、性别、身份证号码，生日，手机号码，入住日期
      ret += [line[0], line[4], line[5], line[6], line[7], line[19], line[20], line[31]].join(', ');
      ret += '\n';
    }
  });
  return ret;
}
