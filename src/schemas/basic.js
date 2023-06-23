const pagination = {
  perPage: {
    in: 'query',
    isInt: {
      options: { min: 5, max: 100 },
    },
    optional: true,
    errorMessage: 'perPage must be an integer between 5 and 100',
  },
  page: {
    in: 'query',
    isInt: {
      options: { min: 1 },
    },
    optional: true,
    errorMessage: 'page must be an integer greater than or equal to 1',
  },
};

module.exports = {
  pagination,
};
