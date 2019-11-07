exports.concat = function concat () {
  let string = '';

  for (let i = 0; i < arguments.length - 1; i++) {
    const arg = arguments[i];
    string += `${arg}`;
  }

  return string;
}