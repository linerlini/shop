const { Sequelize } = require('sequelize')

const db = new Sequelize('shop', 'shop', 'testtest', {
  host: '1.14.74.191',
  port: '3306',
  dialect: 'mysql'
})

module.exports = db
