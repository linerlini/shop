import serve from '.'

export async function requestGoodDetail(id, login) {
  const result = await serve.get('/good/detail', {
    params: {
      id,
      login: Number(login),
    },
  })
  return result.data
}
export async function requestHasCollected(id) {
  const result = await serve.get('/good/collected/has', {
    params: {
      id,
    },
  })
  return result.data
}
export async function requestCollect(id, collected) {
  const result = await serve.get('/good/collect', {
    params: {
      id,
      collectedStr: Number(collected),
    },
  })
  return result.data
}
export async function requestGoodList(params) {
  const result = await serve.post('/good/list', params)
  return result.data
}
