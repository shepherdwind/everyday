'use strict';

function navigate(numberOfIntersections, roads, start, finish) {
  const paths = [start];
  const maps = { [start]: 0 };

  while (paths[0] !== finish) {
    const others = next();
    if (others.length === 0) {
      return null;
    }

    const min = others.reduce((a, b) => {
      return maps[a] <= maps[b || a] ? a : b;
    });
    paths.unshift(min);
  }

  function next() {
    const from = paths[0];
    return roads
    .filter(road => road.from === from && paths.indexOf(road.to) === -1)
    .map(road => {
      debugger;
      const time = road.drivingTime + maps[from];
      if (!maps[road.to] || maps[road.to] > time) {
        maps[road.to] = time;
      }
      return road.to;
    });
  }

  console.log(maps);
  return paths.reverse();
}

var roads = [
  { from: 0, to: 1, drivingTime: 7 },
  { from: 0, to: 2, drivingTime: 9 },
  { from: 0, to: 5, drivingTime: 14 },
  { from: 2, to: 5, drivingTime: 2 },
  { from: 2, to: 3, drivingTime: 11 },
  { from: 5, to: 0, drivingTime: 14 },
  { from: 5, to: 2, drivingTime: 2 },
  { from: 5, to: 4, drivingTime: 9 },
  { from: 4, to: 5, drivingTime: 9 },
  { from: 4, to: 3, drivingTime: 6 },
  { from: 3, to: 4, drivingTime: 6 },
  { from: 3, to: 2, drivingTime: 11 },
  { from: 3, to: 1, drivingTime: 15 },
  { from: 1, to: 0, drivingTime: 7 },
  { from: 1, to: 3, drivingTime: 15 },
  { from: 1, to: 2, drivingTime: 10 },
  { from: 2, to: 1, drivingTime: 10 },
  { from: 2, to: 0, drivingTime: 9 } ];
/*
 *
 *0 -> 0: 0
 *0 -> 1: 5
 *0 -> 2: 10
 *
 *0 -> 1 -> 2: 15
 *0 -> 1 -> 3: 7
 *
 *0 -> 1 -> 3 -> 2: 9
 *0 -> 1 -> 3 -> 4: 17
 *
 *0 -> 1 -> 3 -> 2 -> 4: 13
 *
 */
console.log(navigate(5, roads, 0, 4));
