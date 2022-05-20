const jsonwebtoken = require('jsonwebtoken')
const config = require('../config')

exports.jwt = (req, res, next) => {
  // console.log(req.headers.authorization.slice(7))
  const user = jsonwebtoken.verify(req.headers.authorization, config.jwtSecretKey)
  req.user = user
  console.log(user)
  next()
}
