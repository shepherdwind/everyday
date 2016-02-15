'use strict';
function parseCSV(input, separator, quote) {
  separator = separator || ',';
  quote = quote || '"';
  const len = input.length;

  let index = 0;
  let quoted = false;

  const ret = [];
  while (index !== len) {
    const char = input[index];
    if (index === 0) {
      ret.push(['']);
    }

    const last = ret[ret.length - 1];
    switch (char) {
      case separator:
        add(ret, quoted ? char : '');
        break;
      case '\n':
        add(ret, quoted ? char : ['']);
        break;
      case quote:
        if (readLast(ret).length === 0) {
          quoted = true;
        } else if (quoted && input[index + 1] === quote) {
          // skip next
          index += 1;
          add(ret, char);
        } else if (quoted) {
          // end quoted
          quoted = false;
        }
        break;
      default:
        add(ret, char);
    }
    index += 1;
  }

  return ret;
}

function add(arr, char) {
  const last = arr[arr.length - 1];
  if (Array.isArray(char)) {
    arr.push(char);
    return;
  }

  if (!char) {
    last.push(char);
    return;
  }

  last[last.length - 1] += char;
}

function readLast(arr) {
  const last = arr[arr.length - 1];
  return last[last.length - 1];
}

const input = `one,"two wraps
onto ""two"" lines",three
4,,6
`;
console.log(parseCSV(''));
