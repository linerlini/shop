const { Carousel } = require('../db/model')

const express = require('express')
const router = express.Router()

router.get('/lunbotu', async (req, res) => {
  const carousels = await Carousel.findAll({
    where: {
      num: req.query.num
    }
  })
  if (carousels.length !== 0) {
    res.send(carousels[0].address)
  } else {
    res.send({})
  }
})

module.exports = router
