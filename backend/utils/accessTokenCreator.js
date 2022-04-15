const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
  return jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
}

module.exports = createAccessToken