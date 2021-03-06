export const ResponseCode = {
  SUCCESS: 0,
  LENGTH_ERROR: 1, // 值长度不符合要求
  REPEAT_ERROR: 2, // 值重复
  LACK_OF_ERROR: 3, // 少值
  NO_MATCH_ERROR: 4, // 值不匹配
  RESPONSE_ERROR: 999, // 请求在响应时错误
  REQUEST_ERROR: 998, // 请求在前端出出错
  TOKEN_OUT: 997, // jwt过期
  TOKEN_WRONG: 996,
  NETWORK_ERROR: 995, // 网络问题
  DATABASE_ERROR: 994,
  FILE_UP_ERROR: 993,
}

export const accountReg = /\d{6,10}/
export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){6,10}/
export const LoadStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
}
export const GoodType = {
  FRUIT: '水果',
  VEGETABLES: '蔬菜',
}
export const OrderStatus = {
  CONFIRM: '0',
  FOR_PAYMENT: '1',
  WAITDELIVER: '2',
  FOR_GOODS: '3',
  TO_EVALUATE: '4',
  REFUND_ING: '5',
  REFUND_END: '6',
  SUCCESS: '7',
}
export const PayMethod = {
  INTEGRAL: '1',
  WECHAT: '2',
  ALI: '3',
}
