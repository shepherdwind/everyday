'use strict';
var parse = require('nunjucks/src/parser').parse;

var src = `
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
`;

var nodes = parse(src);
console.log(nodes);
