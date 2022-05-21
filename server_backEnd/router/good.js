const { Good } = require('../db/model')
const { jwt } = require('../middleware/jwt')
const goodHandler = require('../router_handler/good')
const express = require('express')
const router = express.Router()

router.get('/good', async (req, res) => {
  const goods = await Good.findAll({
    attributes: ['id', 'title', 'price', 'src']
  })
  if (goods.length !== 0) {
    goods.forEach(element => {
      element.src = JSON.parse(element.src)
    })
    res.send(goods)
  } else {
    res.send({})
  }
})

router.post('/addShoppingCar', jwt, goodHandler.addShoppingCar)

router.post('/delShoppingCar', jwt, goodHandler.delShoppingCar)

router.post('/altShoppingCar', jwt, goodHandler.altShoppingCar)

router.post('/getShoppingCar', jwt, goodHandler.getShoppingCar)

router.get('/getComment', goodHandler.getComment)

router.get('/getAllComment', goodHandler.getAllComment)

router.get('/getGoodDetail', goodHandler.getGoodDetail)

module.exports = router
