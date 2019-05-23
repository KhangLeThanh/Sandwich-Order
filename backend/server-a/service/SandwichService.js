'use strict';

var mongoose = require('mongoose');
var SandwichModel = mongoose.model('Sandwich');

/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addSandwich = function(body) {
  return new Promise(function(resolve, reject) {
    var new_sandwich = new SandwichModel(body);
    new_sandwich.save(function(err, sandwich) {
      if (err) {
        reject(err);
        return;
      }
      resolve(sandwich);
    });
  });
}


/**
 * Deletes a sandwich
 *
 * sandwichId Long Sandwich id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteSandwich = function(sandwichId,api_key) {
  return new Promise(function(resolve, reject) {
    SandwichModel.remove({
      _id: sandwichId
    }, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
  return new Promise(function(resolve, reject) {
    SandwichModel
      .findById(sandwichId)
      .populate('toppings')
      .exec(function(err, sandwich) {
        if (err) {
          reject(err);
          return;
        }
        resolve(sandwich);
      });
  });
}


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = function() {
  return new Promise(function(resolve, reject) {
    SandwichModel
      .find()
      .populate('toppings')
      .exec(function(err, sandwiches) {
        if (err) {
          reject(err);
          return;
        }
        resolve(sandwiches);
      });
  });
}


/**
 * Updates a sandwich in the store with JSON in body
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateSandwich = function(sandwichId, body) {
  return new Promise(function(resolve, reject) {
    SandwichModel.findOneAndUpdate({_id: sandwichId}, body, function(err, sandwich) {
      if (err) {
        reject(err);
        return;
      }
      resolve(sandwich);
    });
  });
}

