import serve from '.'

export async function requestSearchAssociational(keyword) {
  const result = await serve.get('/search/associational', {
    params: {
      keyword,
    },
  })
  return result.data
}
export async function requestSearchMain(pageIndex, searchText) {
  const result = await serve.post('/search/main', {
    searchText,
    offset: (pageIndex - 1) * 20,
    size: 20,
  })
  return result.data
}
