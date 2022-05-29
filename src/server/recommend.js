import serve from '.'

export async function requestSwipeData() {
  const result = await serve.get('/recommend/swipe')
  return result.data
}
export async function requestRecommendGood(params) {
  const result = await serve.post('/recommend/list', params)
  return result.data
}
