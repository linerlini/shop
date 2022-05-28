import { FAVORITE_KEY, TOKEN_KEY, SEARCH_KEY } from 'assets/js/constant'
import { load } from '../assets/js/storage'

const createState = () => ({
  token: load(TOKEN_KEY) || '',
  isLogin: false,
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY),
  keyword: '',
  address: {},
  orders: [],
})
export default createState
