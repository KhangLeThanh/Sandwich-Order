var mongoose = require('mongoose');

var sandwichSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  toppings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topping'
  }],
  breadType: {
    type: String,
    enum: ["oat", "rye", "wheat"],
    required: true
  }
});

module.exports = mongoose.model('Sandwich', sandwichSchema);