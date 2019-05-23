'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

var sessionUtils = require('../utils/session.js');

module.exports.createUser = function createUser (req, res, next) {
  sessionUtils.checkSession(req)
    .then(function (user) {
      var body = req.swagger.params['body'].value;
      User.createUser(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (error) {
          utils.writeJson(res, {
            error: error
          }, 405);
        });
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 401);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  sessionUtils.checkSession(req)
    .then(function (user) {
      var username = req.swagger.params['username'].value;
      User.deleteUser(username)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (error) {
          utils.writeJson(res, {
            error: error
          }, 400);
        });
      })
      .catch(function (error) {
        utils.writeJson(res, {
          error: error
        }, 401);
      });
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  var username = req.swagger.params['username'].value;
  User.getUserByName(username)
    .then(function (response) {
      if (!response) {
        utils.writeJson(res, {
          error: "User not found"
        }, 404);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 400);
    });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var user = req.swagger.params['user'].value;
  User.loginUser(user)
    .then(function (loggedInUser) {
      // Called only on successful login
      sessionUtils.createSession(req, loggedInUser);
      utils.writeJson(res, loggedInUser);
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 401);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  sessionUtils.destroySession(req);
  utils.writeJson(res, null);
};

module.exports.updateUser = function updateUser (req, res, next) {
  sessionUtils.checkSession(req)
    .then(function (user) {
      var username = req.swagger.params['username'].value;
      var body = req.swagger.params['body'].value;
      User.updateUser(username,body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (error) {
          utils.writeJson(res, {
            error: error
          }, 405);
        });
      })
      .catch(function (error) {
        utils.writeJson(res, {
          error: error
        }, 401);
      });
};
