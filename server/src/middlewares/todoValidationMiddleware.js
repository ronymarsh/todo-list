const ServerError = require('../utils/ServerError');

const todoValidationMiddleware = (req, res, next) => {
  const { title, due_date } = req.body;
  const errors = [];
  if (!title) {
    errors.push(
      new ServerError('Must provide title', 430, 'EMPTY_TITLE').toJSON()
    );
  }
  if (!due_date) {
    errors.push(
      new ServerError('Must provide due date', 431, 'EMPTY_DATE').toJSON()
    );
  }

  req.errors = errors;
  next();
};

module.exports = todoValidationMiddleware;
