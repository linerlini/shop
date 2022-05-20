const { Sequelize } = require('sequelize')

const db = new Sequelize('shopping', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = db
