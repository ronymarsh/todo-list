const User = require('../models/User');
const Password = require('../services/Password');
const { body, validationResult } = require('express-validator');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const UsersRouter = Router();
UsersRouter.get('/currentuser', (req, res) => {
  if (!req.session?.jwt) return res.status(400).send({ currentUser: null });
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    req.currentUser = payload;
  } catch (err) {}
  res.status(200).send({ currentUser: req.currentUser || null });
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
    if (!existingUser) res.status(400).send('Invalid Cradentials');

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) res.status(400).send('Invalid Cradentials');

    // Generate a JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        userName: existingUser.userName,
      },
      process.env.JWT_KEY
    );
    // Store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
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
      throw new Error('Some errors');
    }
    next();
  },
  async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      const user = new User({ userName, email, password });

      await user.save().catch((err) => console.log(err));

      // Generate a JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
          userName: user.userName,
        },
        process.env.JWT_KEY
      );
      // Store it on the session object
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(user.id);
    } else res.status(400).send('email already exists');
  }
);

UsersRouter.get('/signout', (req, res) => {
  req.session = null;
  res.send({});
});

module.exports = UsersRouter;
