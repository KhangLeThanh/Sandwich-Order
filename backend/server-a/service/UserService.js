'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

const _ = require('lodash');

// Used for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var new_user = new UserModel(body);
    // Create a hash of the password
    bcrypt.hash(new_user.password, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      
      // Change pw to hash and actually save
      new_user.password = hash;
      new_user.save(function(err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    UserModel.remove({
      username: username
    }, function(err, user) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    UserModel.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}


/**
 * Logs user into the system
 *
 * user User The user for login
 * returns String
 **/
exports.loginUser = function(user) {
  return new Promise(function(resolve, reject) {
    UserModel.findOne({
      username: user.username

    })
    .select('+password')
    .exec(function(err, foundUser) {
      if (err) {
        reject(err);
      } else if (foundUser == null) {
        reject("User not found.");
      } else {
        bcrypt.compare(user.password, foundUser.password, function(err, result) {
          if (err) {
            reject(err);
          } else if (result) {
            // Return user object without password
            resolve(_.omit(foundUser.toObject(), 'password'));
          } else {
            reject("Incorrect password.");
          }
        });
      }
    });
  });
}

/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(username,body) {
  return new Promise(function(resolve, reject) {
    // Find the user with username and update it.
    UserModel.findOneAndUpdate({username: username}, body, function(err, user) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

