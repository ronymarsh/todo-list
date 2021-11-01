const ServerError = require('../utils/ServerError');
const isValidEmail = require('../services/isValidEmail');

const validationMiddleware = (req, res, next) => {
  const { userName, password, email } = req.body;
  const errors = [];
  if (!userName)
    errors.push(
      new ServerError('Must provide a user name', 490, 'NO_USERNAME').toJSON()
    );

  if (/\s/.test(userName))
    errors.push(
      new ServerError(
        'User name must not contain spaces',
        491,
        'INVALID_USERNAME'
      ).toJSON()
    );

  if (!isValidEmail(email.trim()))
    errors.push(
      new ServerError('Email not valid', 492, 'INVALID_EMAIL').toJSON()
    );

  if (password.length < 4 || password.length > 20)
    errors.push(
      new ServerError(
        'Password must be between 4 and 20 chars long',
        493,
        'INVALID_PASSWORD'
      ).toJSON()
    );

  req.errors = errors;
  next();
};

module.exports = validationMiddleware;
