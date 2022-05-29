import serve from '.'

export async function requestSearchAssociational(keyword) {
  const result = await serve.get('/search/associational', {
    params: {
      keyword,
    },
  })
  return result.data
}
export async function requestSearchMain(params) {
  const result = await serve.post('/search/main', params)
  return result.data
}
