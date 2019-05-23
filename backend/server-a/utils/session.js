var jwt = require('jsonwebtoken');
var utils = require('./writer.js');

var config = {
  secret: 'salainen'
};

module.exports = {
  checkSession: function(req) {
    return new Promise(function(resolve, reject) {
      var token = req.session.token;
      if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            reject(utils.respondWithCode(401, {
              error: 'Failed to authenticate token.'
            }));
            return;
          }
          resolve(decoded);
        });
      } else {
        reject(utils.respondWithCode(403, {
          error: 'No token provided'
        }));
      }
    });
  },
  destroySession: function(req) {
    req.session.token = null;
  },
  createSession: function(req, user) {
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    req.session.token = token;
  }
};