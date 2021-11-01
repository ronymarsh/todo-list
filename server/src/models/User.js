const mongoose = require('mongoose');
const { Schema } = mongoose;
const { todoSchema } = require('./Todo');
const Password = require('../services/Password');

const userSchema = new Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  todos: [todoSchema],
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

module.exports = mongoose.model('users', userSchema);
