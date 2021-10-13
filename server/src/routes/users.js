const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const Password = require('../services/Password');
const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UsersRouter = Router();

UsersRouter.get('/currentuser', (req, res, next) => {
  passport.authenticate('bearer', function (err, user) {
    if (err) return res.status(401).send({ currentUser: null });
    if (!user) return res.status(404).send({ currentUser: null });
    req.logIn(user, { session: false }, function (err) {
      if (err) return next(err);
      return res.status(200).send({ currentUser: user });
    });
  })(req, res, next);
});

UsersRouter.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email not valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  async (req, res) => {
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

    // Generate an access token valid for 1 minute
    const accessToken = jwt.sign(
      {
        id: existingUser.id,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: '60s',
      }
    );

    // Generate a refresh token valid for 30 days or until logout
    const refreshToken = jwt.sign(
      {
        id: existingUser.id,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: '30 days',
      }
    );

    // save the refreshToken in db for token tracking
    const user = existingUser.id;
    const value = refreshToken;
    // if there is a token in db with same user, delete it before saving
    await RefreshToken.deleteOne({ user });
    // create object
    const refreshTokenObj = new RefreshToken({ user, value });
    await refreshTokenObj.save().catch((err) => console.log(err));
    return res.status(200).send({ accessToken, refreshToken });
  }
);

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

      // Generate an access token valid for 1 minute
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_ACCESS_KEY,
        {
          expiresIn: '60s',
        }
      );

      // Generate a refresh token valid for 30 days or until logout
      const refreshToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_REFRESH_KEY,
        {
          expiresIn: '30 days',
        }
      );

      // save the refreshToken in db for token tracking
      user = user.id;
      const value = refreshToken;
      // if there is a token in db with same user, delete it before saving
      await RefreshToken.deleteOne({ user });
      // create object
      const refreshTokenObj = new RefreshToken({ user, value });
      await refreshTokenObj.save().catch((err) => console.log(err));

      return res.status(201).send({ accessToken, refreshToken });
    } else {
      return res
        .status(400)
        .send([{ msg: 'Email already exists', param: 'Email' }]);
    }
  }
);

UsersRouter.post('/refresh', async (req, res) => {
  const { user, refreshToken } = req.body;
  const db_refreshToken = await RefreshToken.findOne({ user });

  if (refreshToken !== db_refreshToken.value)
    return res.status(401).send('No such refresh token');

  if (db_refreshToken.isValid) {
    // Generate an access token valid for 1 minute
    const accessToken = jwt.sign(
      {
        id: user,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: '60s',
      }
    );

    // Generate a refresh token valid for 30 days or until logout
    const new_refreshToken = jwt.sign(
      {
        id: user,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: '30 days',
      }
    );

    // save the new refreshToken in db for token tracking
    const value = new_refreshToken;
    // delete old refresh token before saving new one
    await RefreshToken.deleteOne({ user });
    // create object
    const refreshTokenObj = new RefreshToken({ user, value });
    await refreshTokenObj.save().catch((err) => console.log(err));
    return res
      .status(201)
      .send({ accessToken, refreshToken: new_refreshToken });
  } else return res.status(401).send('refresh token not valid');
});

UsersRouter.post('/signout', async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.decode(token);
  if (decoded == null) return res.status(400).send('Token error');
  // delete user refresh token from db, client side will delete from localStorage
  const user = decoded.id;
  await RefreshToken.deleteOne({ user });
  return res.status(200).send({});
});

UsersRouter.get(
  '/test',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.send({});
  }
);

module.exports = UsersRouter;
