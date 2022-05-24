// import { mockServer } from './base'

// export async function requestSearch () {
//   const result = await mockServer.get('/api/search')
//   return result.data || []
// }
import { get } from './base'
export async function getSearch (value) {
  const result = await get('/api/getSearch', value)
  return result || []
}

export async function getAssociateWord (value) {
  const result = await get('/api/getAssociateWord', value)
  return result || []
}
