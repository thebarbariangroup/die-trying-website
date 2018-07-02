exports.contains = function contains (x, assertions, options) {
  x = x || '';
  x = x.split(' ');
  let containsAssertion = false;
  assertions.split(' ').forEach((assertion) => {
    if (x && x.indexOf(assertion) >= 0) {
      containsAssertion = true;
    }
  });

  if (containsAssertion) {
    return options.fn(this);
  }

  return options.inverse(this);
}

exports.notContains = function notContains (x, assertions, options) {
  x = x || '';
  x = x.split(' ');
  let containsAssertion = false;
  assertions.split(' ').forEach((assertion) => {
    if (x.indexOf(assertion) >= 0) {
      containsAssertion = true;
    }
  });
  
  if (containsAssertion) {
    return options.inverse(this);
  }

  return options.fn(this);
}
