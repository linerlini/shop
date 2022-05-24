const { Good, AssociateWord } = require('../db/model')
const { Op } = require('sequelize')

const express = require('express')
const router = express.Router()

router.get('/getAssociateWord', async (req, res) => {
  const result = await AssociateWord.findAll({
    where: {
      keyword: {
        [Op.substring]: req.query.keyword
      }
    },
    order: [
      ['num', 'DESC']
    ]
  })
  let arr = []
  result.forEach((e) => {
    arr.push(e)
  })
  arr = arr.slice(0, 9)
  res.send({ result: arr, keyword: req.query.keyword })
})

router.get('/getSearch', async (req, res) => {
  const keyword = await AssociateWord.findAll({
    where: {
      keyword: req.query.keyword
    }
  })
  if (keyword.length === 0) {
    console.log('2')
    await AssociateWord.create({ keyword: req.query.keyword, num: 1 })
  } else {
    console.log('1')
    await AssociateWord.increment({ num: 1 }, { where: { keyword: req.query.keyword } })
  }
  const goods = await Good.findAll({
    attributes: ['id', 'title', 'price', 'src']
  })

  if (goods.length !== 0) {
    const result = []
    goods.forEach((e) => {
      // console.log(kmp(e.title, req.query.keyword))
      if (kmp(e.title, req.query.keyword) !== -1) {
        result.push(e)
      }
    })
    // console.log(result.toJSON())
    result.forEach(element => {
      element.src = JSON.parse(element.src)
    })
    res.send(result)
  } else {
    res.send([])
  }

  // if (goods.length !== 0) {
  //   const result = []
  //   goods.forEach((element) => {
  //     if (kmp(element.title, req.query.keyword) !== -1) {
  //       result.push(element)
  //     }
  //   }
  //   res.send(result)
  // } else {
  //   res.send([])
  // }
})

const kmp = (s1, s2) => {
  // console.log(s1)
  // console.log(s2)
  const n = s1.length// 匹配串
  const m = s2.length// 模式串

  if (!m) return 0// 模式串为空
  const next = new Array(m)// next数组
  next[0] = 0
  for (let i = 1, j = 0; i < m; i++) {
    while (j && s2[i] !== s2[j]) { // 不匹配，左移
      j = next[j - 1]
    }
    if (s2[i] === s2[j]) ++j// 匹配 j右移
    next[i] = j
  }
  // 匹配
  for (let i = 0, j = 0; i < n; i++) {
    while (j && s1[i] !== s2[j]) { // 失配 左移
      j = next[j - 1]
    }
    if (s1[i] === s2[j]) ++j// 匹配 j + 1
    if (j === m) return i - m + 1
  }
  return -1
}
module.exports = router
