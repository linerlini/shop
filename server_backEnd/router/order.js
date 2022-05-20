const { Order } = require('../db/model')
const { jwt } = require('../middleware/jwt')

const express = require('express')
const router = express.Router()

router.post('/addOrder', jwt, async (req, res) => {
  await Order.create({
    username: req.user.username,
    price: req.body.price,
    num: req.body.num,
    img: req.body.img,
    title: req.body.title,
    name: req.body.name,
    tel: req.body.tel,
    address: req.body.address,
    note: req.body.note
  })
  res.send({
    ToastMessage: '添加订单成功'
  })
})

router.post('/upadteOrder', jwt, async (req, res) => {
  await Order.update({ status: req.body.status + 1 }, {
    where: {
      id: req.body.id
    }
  })
  res.send({})
})

router.get('/getOrders', jwt, async (req, res) => {
  const result = await Order.findAll({
    where: {
      username: req.user.username
    }
  })
  res.send(result)
})

router.post('/delOrder', jwt, async (req, res) => {
  await Order.destroy({
    where: {
      username: req.user.username,
      id: req.body.id
    }
  })
  res.send({
    ToastMessage: '删除订单成功'
  })
})

module.exports = router
