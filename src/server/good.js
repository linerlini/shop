import serve from '.'

export async function requestGoodDetail(id) {
  const result = await serve.get('/good/detail', {
    params: {
      id,
    },
  })
  return result.data
}
export const a = 1
