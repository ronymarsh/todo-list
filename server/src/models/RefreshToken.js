const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  user: String,
  value: String,
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('refreshTokens', refreshTokenSchema);
