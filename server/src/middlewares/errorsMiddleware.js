const errorsMiddleware = (req, res, next) => {
  const errors = req.errors;
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  next();
};

module.exports = errorsMiddleware;
