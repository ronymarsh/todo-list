const mongoose = require('mongoose');
const { Schema } = mongoose;
const TodoState = require('../enums/TodoState');

// ergency , importance , deadline

const todoSchema = new Schema({
  title: String,
  due_date: Date,
  user: String,
  status: {
    type: String,
    default: TodoState.TODO,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = {
  Todo,
  todoSchema,
};
