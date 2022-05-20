const { Address } = require('../db/model')
const { jwt } = require('../middleware/jwt')

const express = require('express')
const router = express.Router()

router.get('/getAddress', jwt, async (req, res) => {
  const addresss = await Address.findAll({
    where: {
      username: req.user.username
    }
  })
  res.send(addresss)
})

router.post('/addAddress', jwt, async (req, res) => {
  await Address.create({
    username: req.user.username,
    tel: req.body.tel,
    address: req.body.add,
    name: req.body.name
  })
  res.send({
    ToastMessage: '添加地址成功'
  })
})

router.post('/delAddress', jwt, async (req, res) => {
  await Address.destroy({
    where: {
      username: req.user.username,
      id: req.body.id
    }
  })
  res.send({
    ToastMessage: '删除地址成功'
  })
})

module.exports = router
