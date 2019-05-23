'use strict';

var utils = require('../utils/writer.js');
var Topping = require('../service/ToppingService');

module.exports.addTopping = function addTopping (req, res, next) {
  var body = req.swagger.params['body'].value;
  Topping.addTopping(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 405);
    });
};

module.exports.getToppings = function getToppings (req, res, next) {
  Topping.getToppings()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 400);
    });
};
