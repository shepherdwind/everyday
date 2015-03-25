
'use strict';
var nunjucks = require('nunjucks');
var Template = nunjucks.Template;
// var res = env.renderString('hello {{name}}', { name: 'haha' });

var tmpl = new Template('{% if a.b.c == "b" %}1{% endif %}');

tmpl.compile();
console.log(tmpl.rootRenderFunc.toString());
