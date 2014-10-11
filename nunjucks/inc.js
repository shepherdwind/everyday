
'use strict';
var nunjucks = require('/Users/eward/test/nunjucks/');
var Environment = nunjucks.Environment;
var env = new Environment(new nunjucks.FileSystemLoader('views'));

function mytagExtension() {
  this.tags = ['inc'];

  this.parse = function(parser, nodes) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args, null);
  };

  this.run = function(context, name) {
    return 'hello world';
  };
}


env.addExtension('inc', new mytagExtension());

var res = env.render('inc.html', {
  items: {
    aaa: 'bbb',
    ddd: 'eee'
  }
});

console.log(res);
