import httpErrors from 'http-errors';

export default (error, _req, res, _next) => {
  let message;
  if (error.status) {
    message = error;
  } else {
    message = httpErrors(500, 'Sorry, there was an internal error.');
  }
  res.status(message.statusCode || message.status || 500).json(message);
};
