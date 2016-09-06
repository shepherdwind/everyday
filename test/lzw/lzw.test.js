'use strict';
const lzw = require('../../cs/lzw/lzw');

describe('lzw/lzw.test.js', function() {
  it('encode', function() {
    const input = `
Features

Supports both client and server side use.
Separation of parsing and rendering templates.
The basic syntax is fully supported all java version velocity.
Vim Syntax for vim.
Install

via npm:

$ npm install velocityjs
Broswer

Compatible all modern broswer, You can try test case on your browser to test it.

For other lower version broswer, you need have those polyfill function.

Array.prototype map, forEach, some, filter, every, indexOf
Date.now
Object.keys
Examples

You can find a lot of examples from the tests directory. There is no different between the use of browser and NodeJs.
  `;
    const output = lzw.encode(input);
    console.log(input.length, output.length);
    console.log(output);
  });

  it('decode', function() {
    const input = 'foo bar foo baar time, but bar is not foo';
    const code = lzw.encode(input);
    console.log(code);
    const ret = lzw.decode(code);
    console.log(ret);
  });
});
