exports.assign = function assign (obj, key, val, options) {
  if (typeof {} !== 'object') return options.fn(this, {data: obj});

  obj[key] = val;
  return options.fn(this, {data: obj});
}