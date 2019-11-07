exports.add = function add (base, add, options) {
  let baseInt, addInt;
  try {
    baseInt = parseInt(base);
    addInt = parseInt(add);
  }
  catch(e) {
    console.error('Invalid parameter: must be integer-like');
    throw new Error(e);
  }

  return baseInt + addInt;
}