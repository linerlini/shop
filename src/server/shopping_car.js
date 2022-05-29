import serve from '.'

export async function requestAddShopCar(goodId, count) {
  const result = await serve.post('/shoppingcar/add', {
    goodId,
    count,
  })
  return result.data
}
export async function requestUpdateShopCarCount(goodId, count) {
  const result = await serve.post('/shoppingcar/update', {
    id: goodId,
    count,
  })
  return result.data
}
export async function requestShoppingCar() {
  const result = await serve.get('/shoppingcar/list')
  return result.data
}
export async function requestRemoveGoodFromCar(ids) {
  const result = await serve.post('/shoppingcar/remove', ids)
  return result.data
}
