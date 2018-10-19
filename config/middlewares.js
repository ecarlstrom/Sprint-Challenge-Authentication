const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
  authenticate,
  createToken
};

// adding a jwt secret and token generation function for authentication

const jwtSecret = 'SUPER SECRET KEY';

function createToken(user) {

  const jwtPayload = {
    username: user.username
  };

  const jwtOptions = {
    expiresIn: '30m',
    jwtid: '123'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
