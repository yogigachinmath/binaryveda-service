const createError = require('http-errors');

function errorHandler(err, req, res, next) {
  console.log(err.Error);
  if (err.Error === 'Validation') {
    return res.status(400).send(err.msg);
  }
  if (err.Error === 'dbError') {
    return res.status(500).send(`${err.msg}`);
  }
  if (err.Error === 'Unauthorized') {
    return res.status(401).send(`${err.msg}`);
  }
  if (err.Error === 'Forbidden') {
    return next(createError(403, 'Forbidden'));
  } else {
    return res.status(404).send('Not Found');
  }
}

module.exports = errorHandler;
