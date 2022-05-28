const db = require('./index')
const { DataTypes } = require('sequelize')

// 用户
const User = db.define('User', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4
  // },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  tableName: 'users'
})

// 轮播图
const Carousel = db.define('Carousel', {
  num: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  tableName: 'carousels'
})

const Good = db.define('Good', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  src: {
    type: DataTypes.STRING
  },
  params: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  tableName: 'goods'
})

const ShoppingCar = db.define('ShoppingCar', {
  username: {
    type: DataTypes.STRING
  },
  goodId: {
    type: DataTypes.STRING
  },
  num: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'shoppingcars'
})

const AssociateWord = db.define('AssociateWord', {
  keyword: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  num: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'associatewords'
})
const Comment = db.define('Comment', {
  username: {
    type: DataTypes.STRING
  },
  goodId: {
    type: DataTypes.STRING
  },
  rate: {
    type: DataTypes.INTEGER
  },
  text: {
    type: DataTypes.STRING
  }
}, {
  updatedAt: false,
  createdAt: 'date',
  timezone: '+08:00',
  tableName: 'comments'
})

const Address = db.define('Address', {
  username: {
    type: DataTypes.STRING
  },
  tel: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  tableName: 'addresses'
})

const Order = db.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  num: {
    type: DataTypes.STRING
  },
  img: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  tel: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  note: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  updatedAt: false,
  createdAt: 'date',
  timezone: '+08:00',
  tableName: 'orders'
})

Good.sync({ alter: true })
User.sync({ alter: true })
Carousel.sync({ alert: true })
ShoppingCar.sync({ alert: true })
Comment.sync({ alert: true })
Address.sync({ alert: true })
Order.sync({ alert: true })
AssociateWord.sync({ alert: true })

module.exports = {
  User,
  Carousel,
  Good,
  ShoppingCar,
  Comment,
  Address,
  Order,
  AssociateWord
}
