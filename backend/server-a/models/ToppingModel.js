var mongoose = require('mongoose');

var toppingSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Topping', toppingSchema);