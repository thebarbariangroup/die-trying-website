exports.or = function or () {
  let confirm = false;
  const options = arguments[arguments.length - 1];

  if (typeof {} !== 'object') return options.fn(this, {data: obj});

  for (let i = 0; i < arguments.length - 1; i++) {
    if (arguments[i]) {
      confirm = true;
      break;
    }
  }

  if (confirm) {
    return options.fn(this);
  } 

  return options.inverse(this);
}