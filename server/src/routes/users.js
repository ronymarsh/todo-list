const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const Password = require('../services/Password');
const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const generateTokens = require('../services/generateTokens');

const UsersRouter = Router();

UsersRouter.get('/currentuser', (req, res, next) => {
  passport.authenticate('bearer', function (err, user) {
    if (err) return res.status(440).send({ currentUser: null });
    req.logIn(user, { session: false }, function (err) {
      if (err) return next(err);
      return res.send({ currentUser: user });
    });
  })(req, res, next);
});

UsersRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res
      .status(400)
      .send([{ msg: 'Invalid Cradentials', param: 'signin' }]);

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch)
    return res
      .status(400)
      .send([{ msg: 'Invalid Cradentials', param: 'signin' }]);

  const { accessToken, refreshToken } = await generateTokens(existingUser.id);

  return res.send({ accessToken, refreshToken });
});

UsersRouter.post(
  '/signup',
  [
    body('userName')
      .custom((value) => !/\s/.test(value))
      .withMessage('User name must not contain spaces'),
    body('email').trim().isEmail().withMessage('Email not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 chars long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    next();
  },
  async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      var user = new User({ userName, email, password });

      await user.save().catch((err) => console.log(err));

      const { accessToken, refreshToken } = await generateTokens(user.id);

      return res.status(201).send({ accessToken, refreshToken });
    } else {
      return res
        .status(400)
        .send([{ msg: 'Email already exists', param: 'Email' }]);
    }
  }
);

UsersRouter.post('/refresh', async (req, res) => {
  const { oldRefreshToken } = req.body;
  const db_refreshToken = await RefreshToken.findOne({ oldRefreshToken });
  if (!db_refreshToken)
    return res.status(250).send({ accessToken: null, refreshToken: null });

  const user = db_refreshToken.user;
  if (oldRefreshToken !== db_refreshToken.value)
    return res.send({ accessToken: null, refreshToken: null });

  if (db_refreshToken.isValid) {
    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(201).send({ accessToken, refreshToken });
  } else return res.status(260).send({ accessToken: null, refreshToken: null });
});

UsersRouter.post('/signout', async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.decode(token);
  if (decoded == null) return res.send('Token error');
  // delete user refresh token from db, client side will delete from localStorage
  const user = decoded.id;
  await RefreshToken.deleteOne({ user });
  return res.send({});
});

module.exports = UsersRouter;
