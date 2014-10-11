'use strict';
var util = require('util');
var nunjucks = require('/Users/eward/test/nunjucks');
// var c = new Compiler();
 var src = '{% macro foo() %}{% include "include.html" %}{% endmacro %} This is my template {{ foo() }}';
console.log(nunjucks.compiler.compile(src));

