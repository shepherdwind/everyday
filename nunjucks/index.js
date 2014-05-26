var nunjucks = require('nunjucks');
nunjucks.configure('views');
var res = nunjucks.render('index.html', {
  title: 'Hello, world',
  items: {
    aaa: 'bbb',
    ddd: 'eee'
  }
});
console.log(res);
