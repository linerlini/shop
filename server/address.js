import { post, get } from './base'

export function addAddress (item) {
  return post('/api/addAddress', item)
}

export function delAddress (item) {
  return post('/api/delAddress', item)
}

export function getAddress (item) {
  return get('/api/getAddress', item)
}
