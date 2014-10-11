'use strict';
var nunjucks = require('/Users/eward/test/nunjucks/');
var Environment = nunjucks.Environment;
var env = new Environment(new nunjucks.FileSystemLoader('views'));

var res = env.render('set.html', {
  title: 'Hello, world',
  items: {
    aaa: 'bbb',
    ddd: 'eee'
  }
});

console.log(res);
