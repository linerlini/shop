const express = require('express')
// const expressJoi = require('@escook/express-joi')

const router = express.Router()

const userHandler = require('../router_handler/user')

// const { loginRegiSchema } = require('../schema/user')

// 注册
router.post('/register', userHandler.register)
// router.post('/register', expressJoi(loginRegiSchema), userHandler.register)

// 登录
router.post('/login', userHandler.login)

module.exports = router
