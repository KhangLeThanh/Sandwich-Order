var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  sandwichId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sandwich'
  },
  status: {
    type: String,
    enum: ["received", "inQueue", "ready", "failed"],
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);