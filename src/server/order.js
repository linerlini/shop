import serve from '.'

export async function requestCreateOrder(params) {
  const result = await serve.post('/order/create', params)
  return result.data
}

export async function requestOrderList(params) {
  const result = await serve.post('/order/list', params)
  return result.data
}

export async function requestPay(id) {
  const result = await serve.get('/order/pay', {
    params: {
      id,
    },
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
