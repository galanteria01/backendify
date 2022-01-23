const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  }
});

module.exports = model('User', UserSchema);