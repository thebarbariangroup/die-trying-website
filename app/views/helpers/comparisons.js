exports.assert = function assert (obj, val, options) {
  if (typeof {} !== 'object') return options.fn(this, {data: obj});
  
  return obj === val;
}

exports.greaterThan = function assert (a, b, options) {
  if (typeof {} !== 'object') return options.fn(this, {data: obj});
  
  if (a > b) {
    return options.fn(this);
  } 

  return options.inverse(this);
}

exports.lessThan = function assert (a, b, options) {
  if (typeof {} !== 'object') return options.fn(this, {data: obj});
  
  if (a < b) {
    return options.fn(this);
  } 

  return options.inverse(this);
}