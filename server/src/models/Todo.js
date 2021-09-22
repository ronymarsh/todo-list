const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
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
  content: String,
});

module.exports = todoSchema;
