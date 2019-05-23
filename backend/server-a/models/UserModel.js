var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

module.exports = mongoose.model('User', userSchema);