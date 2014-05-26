/**
 * 把csdn数据转换为可以导入的mysql语法
 */

var fs = require('fs')
var path = require('path')

var ProgressBar = require('progress')
// 文件总长度
var totalLen = 287238395
// 每一步完成100次读取，每次读取65536长度字符串
var step = 65536 * 100
// 完成的任务
var processed = 0

// 进度条
var bar = new ProgressBar('Process [:bar] :elapseds spend, left :etas', {
  total: Math.ceil(totalLen / step)
})

// 开始处理时间
var t = Date.now()
var sqlReader = fs.createReadStream('./www.csdn.net.sql')
var sqlWriter = fs.createWriteStream('./csdn.sql')

var end = ''

sqlReader.on('data', function(buf){

  buf = end + buf.toString()
  var pass = buf.split('\n')
  var len = pass.length
  end = pass[len - 1]

  sqlWriter.write(parseSql(pass, len))
  processed += 1

  if (processed % 100 === 0) {
    bar.tick()
  }

})

// 数据条数
var rowNum = 0

sqlReader.on('end', function(){
  bar.tick()
  console.log('finish, cost: %sms, count: %s', Date.now() - t, rowNum)
})

function parseSql(pass, len){

  var sql =  'insert into user (name, password, email) values '
  var rows = []

  for (var i = 0; i < len - 1; i++) {
    var row = '('
    var items = pass[i].split(' # ').map(function(part){
      return '"' + mysql_escape(part.trim()) + '"'
    })

    // 检查格式，如果超过3个元素，说明split出现了问题
    if (items.length !== 3) throw Error(items);

    row += items.join(', ')
    row += ')'
    rows.push(row)
    rowNum += 1
  }

  sql += rows.join(',\n') + ';\n'
  return sql
}

function mysql_escape(sql){
  var specChars = /(['"\\])/g
  return sql.replace(specChars, '\\$1')
}
