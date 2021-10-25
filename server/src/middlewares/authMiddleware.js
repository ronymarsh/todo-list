const passport = require('passport');
const ServerError = require('../utils/ServerError');
const consts = require('../consts');

const authMiddleware = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    passport.authenticate(consts.BEARER_STRATEGY, function (err, user) {
      if (err)
        return next(new ServerError('Token Expired', 440, 'TOKEN_EXPIRED'));
      req.user = user;
      next();
    })(req, res, next);
  } else next(new ServerError('Unauthorized', 401, 'UNAUTHORIZED'));
};

module.exports = authMiddleware;
