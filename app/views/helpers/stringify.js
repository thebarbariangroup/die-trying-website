exports.stringify = function stringify (obj, options) {
  if (typeof {} !== 'object') return options.fn(this, {data: obj});

  return JSON.stringify(obj);
}