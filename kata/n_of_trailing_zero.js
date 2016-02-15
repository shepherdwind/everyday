function zeros (n) {
  var num = 0;
  for (var i = 5; i <=n; i+= 5) {
    num += _zeros(i);
  }
  return num;
}

function _zeros(n) {
  var num = 0;

  if (n % 5 === 0) {
    return _zeros(n / 5) + 1;
  } else {
    return 0;
  }

}

console.log(zeros(1000));
