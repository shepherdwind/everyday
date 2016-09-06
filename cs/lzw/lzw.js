'use strict';

function encode(input) {
  const len = input.length;
  const table = new Map();

  let index = -1;
  let output = [];
  let maxChar = 256;
  const tt = [];

  function next(baseChar, step) {
    let code;
    baseChar = baseChar || '';
    const char = input[++index];

    // end
    if (char === undefined) {
      return;
    }

    const charCode = char.charCodeAt(0);

    const prev = input[index - 1 - baseChar.length];
    const nextChar = input[index + 1];

    if (nextChar !== undefined) {
      const hash = baseChar + char + nextChar;
      if (table.has(hash)) {
        index += 1;
        return next(hash);
      } else if (prev !== undefined) {
        if (baseChar) {
          table.set(prev + baseChar, ++maxChar);
          tt.push([prev + baseChar, maxChar]);
          table.set(baseChar + char, ++maxChar);
          tt.push([baseChar + char, maxChar]);
        } else {
          table.set(prev + char, ++maxChar);
          tt.push([prev + char, maxChar]);
        }
      }
    }

    if (baseChar) {
      output.push(String.fromCharCode(table.get(baseChar)));
    }
    output.push(char);
  }

  while (index < len) {
    next();
  }

  return output.join('');
}

function decode(input) {
  const len = input.length;
  const table = new Map();
  const tt = [];

  let output = [];
  let maxChar = 256;

  for (let i = 0; i < len; i++) {
    let current = input[i];
    let prev = input[i - 1];
    const code = current.charCodeAt(0);

    if (prev === undefined) {
      output.push(current);
      continue;
    }

    if (table.has(code)) {
      current = table.get(code);
    }

    const prevCode = prev.charCodeAt(0);
    if (table.has(prevCode)) {
      prev = table.get(prevCode);
    }

    table.set(++maxChar, prev + current);
    tt.push([maxChar, prev + current]);

    output.push(current);
  }

  return output.join('');

}

module.exports = {
  encode,
  decode,
};
