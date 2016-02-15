'use strict';

function solution(input, markers){
	return markers.reduce(function(input, marker) {
  	marker = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    debugger;
  	return input.replace(new RegExp(`\\s*${marker}[^\\n]+`, 'gm'), '');
  }, input);
}

var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])

console.log(JSON.stringify(result));
