'use strict';
var nunjucks = require('/Users/eward/test/nunjucks/');
var Environment = nunjucks.Environment;
var env = new Environment(new nunjucks.FileSystemLoader('views'));

var fs = require('fs');
var path = require('path');

function mytagExtension() {
  this.tags = ['inc'];

  this.parse = function(parser, nodes) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args, null);
  };

  this.run = function(context, filename, ctx) {
    console.log(context);
    var view = path.join(__dirname, './views/', filename);
    var viewStr = fs.readFileSync(view).toString();
    var ret = nunjucks.compile(viewStr, env, view, true);

    return ret.render(ctx);
  };
}


env.addExtension('inc', new mytagExtension());

env.addFilter('shorten', function(str, count) {
    return str.slice(0, count || 5);
});

var res = env.render('index.html', {
  title: 'Hello, world',
  name: 'haha',
  items: {
    aaa: 'bbb',
    ddd: 'eee'
  }
});

console.log(res);
