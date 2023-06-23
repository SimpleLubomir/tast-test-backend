const { validationResult, matchedData } = require('express-validator');
const customError = require('../utils/customError');

module.exports = (validators = []) => {
  const $validators = Array.isArray(validators) ? validators : [validators];

  $validators.push((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(customError(400, errors.array()));
    }

    const validated = {
      get body() {
        return matchedData(req, {
          locations: ['body'],
          onlyValidData: true,
        });
      },
      get query() {
        return matchedData(req, {
          locations: ['query'],
          onlyValidData: true,
        });
      },
      get params() {
        return matchedData(req, {
          locations: ['params'],
          onlyValidData: true,
        });
      },
      get cookies() {
        return matchedData(req, {
          locations: ['cookies'],
          onlyValidData: true,
        });
      },
      get headers() {
        return matchedData(req, {
          locations: ['headers'],
          onlyValidData: true,
        });
      },
    };

    Object.defineProperty(req, 'validated', {
      get() {
        return validated;
      },
    });

    return next();
  });

  return $validators;
};
