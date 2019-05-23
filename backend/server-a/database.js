/* eslint-disable */
var mongoose = require('mongoose');

// Load the models
var UserModel = require('./models/UserModel');
var OrderModel = require('./models/OrderModel');
var ToppingModel = require('./models/ToppingModel');
var SandwichModel = require('./models/SandwichModel');

var User = require('./service/UserService');
var Topping = require('./service/ToppingService');
var AddOrders = require('./utils/addOrders');

var _ = require('lodash');

var testUser = {
  username: "test",
  password: "test"
};

var testToppings = [
  "Cheese",
  "Salami",
  "Ham",
  "Pepperoni",
  "Lettuce",
  "Tomato"
];

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(process.env.MONGODB_URI, {
      "auth": { "authSource": "admin" },
      "user": process.env.MONGO_INITDB_ROOT_USERNAME,
      "pass": process.env.MONGO_INITDB_ROOT_PASSWORD
    }).then(() => {
        console.log('Database connection successful');
        Topping.getToppings()
          .then((toppings) => {
            let existingToppings = _.map(toppings, 'name');
            testToppings.forEach((toppingName) => {
              if (!existingToppings.includes(toppingName)) {
                Topping.addTopping({
                  name: toppingName
                }).then((result) => {
                  console.log("Added topping %s", toppingName);
                }).catch((error) => {
                  console.log("Error when adding topping");
                  console.log(error);
                });
              } else {
                console.log("Topping %s already exists", toppingName);
              }
            });
          })
          .catch((error) => {
            console.log("Error fetching toppings.");
            console.log(error);
          });

        User.getUserByName(testUser.username)
          .then((user) => {
            if (!user) {
              console.log('Creating test user...');
              User.createUser(testUser);
            } else {
              console.log('Test user already found in DB');
            }
          });
      })
      .catch(err => {
        console.error('Database connection error');
        console.error(err);
      });
  }
}
AddOrders.AddOrdersFromDB();

module.exports = new Database();