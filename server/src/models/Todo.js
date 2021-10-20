const mongoose = require('mongoose');
const { Schema } = mongoose;

// ergency , importance , deadline

const todoSchema = new Schema({
  title: String,
  due_date: Date,
  status: {
    type: String,
    default: 'TODO',
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

module.exports = todoSchema;
