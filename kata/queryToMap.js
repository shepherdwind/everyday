'use strict';

function convertQueryToMap(query) {
  query = decodeURIComponent(query);
  const urls = query.split('&');
  const ret = {};
  for (let i = 0; i < urls.length; i++) {
    const val = urls[i].split('=');
    objectPath(ret, val[0].split('.'), val[1]);
  }
  return ret;
}

function objectPath(obj, path, value) {
  const len = path.length - 1;
  let o = obj;
  path.map(function(key, i) {
    if (i === len) {
      o[key] = value;
      return;
    }
    o[key] = o[key] || {};
    o = o[key];
  });
  return obj;
}
var q = 'user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue';
console.log(convertQueryToMap(q));
