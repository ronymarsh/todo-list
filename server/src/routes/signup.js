const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/users/signup', async (req, res) => {
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
};
