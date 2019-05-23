'use strict';

var mongoose = require('mongoose');
var ToppingModel = mongoose.model('Topping');

/**
 * Add a new topping to the store. Needs an API key.
 *
 * body Topping Topping object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addTopping = function(body) {
  return new Promise(function(resolve, reject) {
    var new_topping = new ToppingModel(body);
    new_topping.save(function(err, topping) {
      if (err) {
        reject(err);
        return;
      }
      resolve(topping);
    });
  });
}

/**
 * Get a list of all toppings. Empty array if no toppings are found.
 *
 * returns ArrayOfToppings
 **/
exports.getToppings = function() {
  return new Promise(function(resolve, reject) {
    ToppingModel
      .find()
      .populate('toppings')
      .exec(function(err, toppings) {
        if (err) {
          reject(err);
          return;
        }
        resolve(toppings);
      });
  });
}
