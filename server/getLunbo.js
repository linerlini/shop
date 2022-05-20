import { get } from './base'

export function getLunbo (value) {
  return get('/api/lunbotu', value)
}
