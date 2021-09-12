const User = require('../models/User');

const { Router } = require('express');

const UsersRouter = Router();

UsersRouter.get('/currentuser', (req, res) => {
  res.status(200).send({ userName: 'Samer' });
});

UsersRouter.post('/signin', (req, res) => {
  res.status(200).send(req.body);
});

UsersRouter.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (!existingUser) {
    const user = new User({ userName, email, password });

    try {
      user.save();
    } catch (err) {
      console.log(err);
    }

    res.status(201).send(user);
  } else res.status(200).send('email already exists');
});

UsersRouter.get('/signout', (req, res) => {
  res.status(200).send({ message: 'signout' });
});

module.exports = UsersRouter;
