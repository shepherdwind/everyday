'use strict';
var Morse = {};

Morse.encode = function(message){
  // ·–·–·– ·–·–·– ·–·–·–
  const bin = message
  .split('')
  .map(function(char) {
    return Morse.alpha[char];
  })
  .join('000');
  const ret = [];
  for (let i = 0; i < bin.length; i += 32) {
    let code = bin.slice(i, i + 32);
    while (code.length !== 32) {
      code += '0';
    }
    ret.push(code);
  }
  return ret.map(bin => {
    if (bin[0] === '1') {
      return -(~parseInt(bin, 2) + 1);
    }
    return parseInt(bin, 2);
  });
};

Morse.decode = function(integerArray){
  // ·–·–·– ·–·–·– ·–·–·–
  let binStr = integerArray.map(function(int) {
    if (int >= 0) {
      let str = int.toString(2);
      while (str.length < 32) {
        str = '0' + str;
      }

      return str;
    }

    return (int >>> 0).toString(2);
  })
  .join('');
  while (binStr[binStr.length - 1] === '0') {
    binStr = binStr.slice(0, binStr.length - 1);
  }

  const words = binStr.split('0000000').map(s => s.split('000'));
  return words.map(word => word.map(char => Morse.binMap[char] || '').join('')).join(' ').trim();
};

Morse.alpha = {
  'A': '10111',
  'B': '111010101',
  'C': '11101011101',
  'D': '1110101',
  'E': '1',
  'F': '101011101',
  'G': '111011101',
  'H': '1010101',
  'I': '101',
  'J': '1011101110111',
  'K': '111010111',
  'L': '101110101',
  'M': '1110111',
  'N': '11101',
  'O': '11101110111',
  'P': '10111011101',
  'Q': '1110111010111',
  'R': '1011101',
  'S': '10101',
  'T': '111',
  'U': '1010111',
  'V': '101010111',
  'W': '101110111',
  'X': '11101010111',
  'Y': '1110101110111',
  'Z': '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  '_': '10101110111010111',
  '"': '101110101011101',
  '$': '10101011101010111',
  '@': '10111011101011101',
  ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
};
Morse.binMap = {};
Object.keys(Morse.alpha).map(key => {
  Morse.binMap[Morse.alpha[key]] = key;
});
// console.log(Morse.encode('EEEEEEEIE'));
const arr = Morse.encode('KK0HP1TE7L7SYVI $@KAFC7BGYQ1IF6R !"3U46IPBH0BPGB9');
console.log(Morse.decode(arr));
