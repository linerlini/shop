import { post, get } from './base'

export function addOrder (item) {
  return post('/api/addOrder', item)
}

export function getOrders () {
  return get('/api/getOrders')
}

export function delOrder (item) {
  return post('/api/delOrder', item)
}

export function upadteOrder (item) {
  return post('/api/upadteOrder', item)
}
