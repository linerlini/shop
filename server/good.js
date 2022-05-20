import { get, post } from './base'

export function getGoodList () {
  return get('/api/good')
}

export function addShoppingCar (item) {
  return post('/api/addShoppingCar', item)
}

export function delShoppingCar (item) {
  return post('/api/delShoppingCar', item)
}

export function getShoppingCar () {
  return post('/api/getShoppingCar')
}

export function getGoodDetail (id) {
  return get('/api/getGoodDetail', id)
}

export function getComment (id) {
  return get('/api/getComment', id)
}

export function getAllComment (id) {
  return get('/api/getAllComment', id)
}
