const jwt = require('jsonwebtoken')

exports.jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

exports.jwtSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}