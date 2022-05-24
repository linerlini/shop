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
  timestamps: false
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
  timestamps: false
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
  timestamps: false
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
  timestamps: false
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
  timestamps: false
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
  timezone: '+08:00'
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
  timestamps: false
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
  timezone: '+08:00'
})

Good.sync({ alter: true })
User.sync({ alter: true })
Carousel.sync({ alert: true })
ShoppingCar.sync({ alert: true })
Comment.sync({ alert: true })
Address.sync({ alert: true })
Order.sync({ alert: true })
AssociateWord.sync({ alert: true })

// Address.create({ username: '123456', tel: '15565', address: '44464464', name: 'acdz' })
// Comment.create({
//   username: 'yubowen',
//   rate: 4,
//   text: '还可以吧，能吃',
//   goodId: 'd5e1bf6d-f7ca-4510-bdfa-c567e27a4f63'
// })
// Comment.create({
//   username: '王钰翔',
//   rate: 2,
//   text: '这种东西拿给高贵的我吃，属实是委屈我了，懂不懂高贵两个字的含金量啊',
//   goodId: 'd5e1bf6d-f7ca-4510-bdfa-c567e27a4f63'
// })
// Good.create(
//   {
//     title: '蔬菜水果组合包18斤 苹果青见各4斤 蒜薹茄子黄瓜各2斤大蒜生姜西葫芦豆角各1kg',
//     price: 199.50,
//     src: JSON.stringify(['https://m.360buyimg.com/babel/s325x285_jfs/t1/104989/33/29630/205283/626b99b8E3980ece7/06384ab3edb1582b.jpg!q70.dpg.webp', 'https://m.360buyimg.com/babel/s325x285_jfs/t1/213167/19/18135/230053/626897a6E707e2117/ee060be8cc70fddc.jpg!q70.dpg.webp']),
//     params: JSON.stringify({ 产地: '见外包装', 净含量: '2kg', 储存条件: '冷冻' }),
//     images: JSON.stringify(['https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp', 'https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp'])
//   })
// Good.create(
//   {
//     title: '对面小城  五花肉土猪肉带皮五花肉 烧烤烤肉生鲜食材 4斤装',
//     price: 119.00,
//     src: JSON.stringify(['https://m.360buyimg.com/babel/s325x285_jfs/t1/213167/19/18135/230053/626897a6E707e2117/ee060be8cc70fddc.jpg!q70.dpg.webp', 'https://m.360buyimg.com/babel/s325x285_jfs/t1/213167/19/18135/230053/626897a6E707e2117/ee060be8cc70fddc.jpg!q70.dpg.webp']),
//     params: JSON.stringify({ 产地: '见外包装', 净含量: '2kg', 储存条件: '冷冻' }),
//     images: JSON.stringify(['https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp', 'https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp'])
//   })
// Good.create(
//   {
//     title: '泰国进口金枕头榴莲 2-2.5kg 1个装 新鲜水果',
//     price: 179.9,
//     src: JSON.stringify(['https://m.360buyimg.com/babel/s325x285_jfs/t21148/111/2345162166/294572/d327aa92/5b51becaNe78be7fa.jpg!q70.dpg.webp', 'https://m.360buyimg.com/babel/s325x285_jfs/t1/213167/19/18135/230053/626897a6E707e2117/ee060be8cc70fddc.jpg!q70.dpg.webp']),
//     params: JSON.stringify({ 产地: '见外包装', 净含量: '2kg', 储存条件: '冷冻' }),
//     images: JSON.stringify(['https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp', 'https://img10.360buyimg.com/imgzone/jfs/t1/123282/25/28196/232165/626527f8E5fe4dafe/2e816559d932d74f.jpg!q70.dpg.webp'])
//   })
// Carousel.create({ num: 1, address: JSON.stringify(['http://127.0.0.1:3007/lunbotu/1.webp', 'http://127.0.0.1:3007/lunbotu/1.webp', 'http://127.0.0.1:3007/lunbotu/1.webp', 'http://127.0.0.1:3007/lunbotu/1.webp']) })
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
