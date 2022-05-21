const { ShoppingCar, Good, Comment } = require('../db/model')
const { QueryTypes } = require('sequelize')
const db = require('../db/index')

exports.delShoppingCar = async (req, res) => {
  await ShoppingCar.destroy({
    where: {
      username: req.user.username,
      goodId: req.body.id
    }
  })
  res.send({})
}

exports.altShoppingCar = async (req, res) => {
  console.log(req.body)
  await ShoppingCar.update({ num: req.body.num }, {
    where: {
      username: req.user.username,
      goodId: req.body.goodId
    }
  })
  res.send({ })
}

exports.addShoppingCar = async (req, res) => {
  const shoppingCars = await ShoppingCar.findAll({
    where: {
      username: req.user.username,
      goodId: req.body.id
    }
  })
  if (shoppingCars.length === 0) {
    ShoppingCar.create({ username: req.user.username, goodId: req.body.id, num: 1 })
  } else {
    shoppingCars[0].num += 1
    shoppingCars[0].save()
  }
  res.send({
    ToastMessage: '添加购物车成功'
  })
}

exports.getShoppingCar = async (req, res) => {
  // const shoppingCars = await ShoppingCar.findAll({
  //   attributes: ['goodId', 'num'],
  //   where: {
  //     username: req.user.username
  //   }
  // })
  // if (shoppingCars.length === 0) {
  //   res.send([])
  // } else {
  //   const result = []
  //   shoppingCars.forEach(async (e) => {
  //     const goods = await Good.findAll({
  //       attributes: ['id', 'title', 'price', 'src'],
  //       where: {
  //         id: e.goodId
  //       }
  //     })
  //     goods[0].src = JSON.parse(goods[0].src)
  //     const b = result.push(goods[0].dataValues)
  //     if (b === shoppingCars.length) {
  //       res.send(result)
  //     }
  //   })
  const shoppingCars = await db.query("SELECT goods.id,title,price,src,num FROM goods,shoppingcars WHERE shoppingcars.goodId = goods.id and username='123456'", { type: QueryTypes.SELECT })
  shoppingCars.forEach(async (e) => {
    e.src = JSON.parse(e.src)
  })
  // console.log(shoppingCars)
  res.send(shoppingCars)
}

exports.getGoodDetail = async (req, res) => {
  const goodDetails = await Good.findAll({
    where: {
      id: req.query.id
    }
  })
  if (goodDetails.length !== 0) {
    goodDetails.forEach((a) => {
      a.src = JSON.parse(a.src)
      a.params = JSON.parse(a.params)
      a.images = JSON.parse(a.images)
    })
    res.send(goodDetails[0])
  } else {
    res.send({
      ToastMessage: '商品不存在',
      status: 1
    })
  }
}

exports.getComment = async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      goodId: req.query.id
    },
    limit: 2
  })
  if (comments.length !== 0) {
    // comments.forEach((a) => {
    //   console.log(a.date.toString())
    //   console.log(a.date.toString().slice(0, 8))
    //   a.date = a.date.toString().slice(0, 8)
    // })
    res.send(comments)
  } else {
    res.send({})
  }
}

exports.getAllComment = async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      goodId: req.query.id
    }
  })
  if (comments.length !== 0) {
    comments.forEach((a) => {
      a.date = a.date.toString().slice(0, 8)
    })
    res.send(comments)
  } else {
    res.send({})
  }
}
