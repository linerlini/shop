import serve from '.'

export async function requestCreateOrder(params) {
  const result = await serve.post('/order/create', params)
  return result.data
}

export async function requestOrderList(params) {
  const result = await serve.post('/order/list', params)
  return result.data
}

export async function requestOrderDetail(id) {
  const result = await serve.get('/order/detail', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestPay(id, address) {
  const result = await serve.post('/order/pay', {
    id,
    address,
  })
  return result.data
}
export async function requestSendGood(id) {
  const result = await serve.get('/order/send', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestReceiveGood(id) {
  const result = await serve.get('/order/receive', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestCancelOrder(id) {
  const result = await serve.get('/order/cancel', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestComment(params) {
  const result = await serve.post('/order/comment', params)
  return result.data
}
export async function requestRefund(params) {
  const result = await serve.post('/order/refund', params)
  return result.data
}
export async function requestCancelRefund(id) {
  const result = await serve.get('/order/refund/cancel', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestRefundSucess(id) {
  const result = await serve.get('/order/refund/sucess', {
    params: {
      id,
    },
  })
  return result.data
}
