module.exports = (req, res, next) => {
 // Add a helper function to the response object
 res.success = (data, options = {}) => {
  const { message, status = 200 } = options;

  const response = {
   message,
   status,
   data,
  };

  res.status(status).json(response);
 };

 next();
};
