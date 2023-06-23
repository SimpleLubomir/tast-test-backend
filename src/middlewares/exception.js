const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  const { statusCode, status, code, message } = err;
  const $status = parseInt(statusCode || status || code, 10);

  if ($status && $status >= 400) {
    if ($status === 400) {
      const errors = (Array.isArray(message) ? message : [message]).map(
        (value) => (typeof value === 'object' ? value.msg : value)
      );

      res.status(400).json({
        message: 'Validation Exception',
        status: 400,
        errors,
      });
    } else {
      res.status($status).json({ message, status: $status });
    }
  } else {
    logger.error(err);

    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};
