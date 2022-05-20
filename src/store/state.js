import { load } from '../assets/js/storage'
import { FAVORITE_KEY, TOKEN_KEY, SEARCH_KEY } from '../assets/js/constant'
const state = {
  token: load(TOKEN_KEY) || '',
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY),
  keyword: '',
  address: {},
  orders: []
}
export default state
