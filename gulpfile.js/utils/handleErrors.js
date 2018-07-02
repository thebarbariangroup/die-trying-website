exports.handleErrors = function handleErrors (err) {
  console.log('THIS IS AN ERROR');
  console.log(err.toString());
  this.emit('end');
}