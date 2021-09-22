const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const { Router } = require('express');

const UsersRouter = Router();

UsersRouter.get('/currentuser', (req, res) => {
  res.status(200).send({ userName: 'Samer' });
});

UsersRouter.post('/signin', (req, res) => {
  res.status(200).send(req.body);
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
    console.log(errors);
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

      try {
        user.save((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }

      res.status(201).send(user);
    } else res.status(200).send('email already exists');
  }
);

UsersRouter.get('/signout', (req, res) => {
  res.status(200).send({ message: 'signout' });
});

module.exports = UsersRouter;
