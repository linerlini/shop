import serve from '.'

export async function requestSwipeData() {
  const result = await serve.get('/recommend/swipe')
  return result.data
}
export async function requestRecommendGood(index, searchText) {
  const result = await serve.post('/recommend/list', {
    searchText,
    offset: (index - 1) * 20,
    size: 20,
  })
  return result.data
}
