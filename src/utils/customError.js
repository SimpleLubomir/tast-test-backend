const createError = require('http-errors');

module.exports = (status, message) => {
  const error = createError(status, message);

  error.message = message;
  return error;
};
