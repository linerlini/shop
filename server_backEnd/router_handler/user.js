const { User } = require('../db/model')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = async (req, res) => {
  const users = await User.findAll({
    where: {
      username: req.body.username
    }
  })
  if (users.length === 1) {
    console.log('haha')
    res.send({
      status: 0,
      ToastMessage: '用户名重复'
    })
  } else {
    User.create({ username: req.body.username, password: req.body.password })
    const user = { username: req.body.username }
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '24h'
    })
    res.send(JSON.stringify({
      status: 1,
      ToastMessage: '注册成功',
      token: token
    }))
  }
}

exports.login = async (req, res) => {
  const users = await User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  // console.log(users)
  if (users.length === 1) {
    const user = { username: users[0].username }
    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '24h'
    })
    res.send({
      status: 1,
      ToastMessage: '登录成功！',
      token: token
    })
  } else {
    res.send({
      status: 0,
      ToastMessage: '密码错误！'
    })
  }
}
