'use strict';

function getMissingIngredients(recipe, added) {
  const items = Object.keys(recipe);
  let count = 1;
  items.map(function(item) {
    const amount = added[item] || 0;
    const number = Math.ceil(amount / recipe[item]);
    count = number > count ? number : count;
  });

  const missing = {};
  items.map(function(item) {
    const n = recipe[item] * count - (added[item] || 0);
    if (n > 0) {
      missing[item] = n;
    }
  });
  return missing;
}

var recipe = {flour: 200, eggs: 1, sugar: 100};
console.log(getMissingIngredients(recipe, {}))
