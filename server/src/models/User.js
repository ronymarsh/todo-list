const mongoose = require('mongoose');
const { Schema } = mongoose;
const todoSchema = require('./Todo');

const userSchema = new Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  todos: [todoSchema],
});

module.exports = mongoose.model('users', userSchema);
