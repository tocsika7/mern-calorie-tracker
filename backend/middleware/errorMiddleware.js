const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode;

  if (process.env.NODE_ENV === 'dev') {
    console.error(`${err.stack}`.red);
  }
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = errorHandler;
