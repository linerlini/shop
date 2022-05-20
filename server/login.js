import { post } from './base'

export function login (value) {
  return post('/api/login', value)
}

export function register (value) {
  return post('/api/register', value)
}
