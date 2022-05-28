const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')

const app = express()

const userRouter = require('./router/user')
const lunboRouer = require('./router/lunbo')
const goodRouter = require('./router/good')
const searchRouter = require('./router/search')
const addressRouter = require('./router/address')
const orderRouter = require('./router/order')
var jsonParser = bodyParser.json()

app.use(express.static('./public'))
app.use(cors())
app.use(jsonParser, (req, res, next) => {
  console.log(req.body)
  next()
})

app.use('/api', userRouter)
app.use('/api', lunboRouer)
app.use('/api', goodRouter)
app.use('/api', searchRouter)
app.use('/api', addressRouter)
app.use('/api', orderRouter)
// app.set('host', '192.168.210.93')
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})

// 错误级别中间件
app.use(function (err, req, res, next) {
  console.log('xixi')
  if (err instanceof jsonwebtoken.TokenExpiredError) return res.status(403).send('403')
  if (err instanceof jsonwebtoken.JsonWebTokenError) return res.status(401).send('401')
  // if (err instanceof jsonwebtoken.NotBeforeError) return res.status(401).send('405')
  console.log('haha')
  res.send(err)
})
