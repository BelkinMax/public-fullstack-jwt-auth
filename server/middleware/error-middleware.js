const ApiError = require('../exceptions/api-errors');

module.exports = function (err, req, res, next) {
  console.log('🤬', err);

  if (err instanceof ApiError) {
    const { message, errors } = err;

    return res.status(err.status).json({ message, errors });
  }

  return res.status(500).json({ message: '🤷‍♂️ Unexpected error' });
};
