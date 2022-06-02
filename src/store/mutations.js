import { TOKEN_KEY } from 'assets/js/constant'

export const UPDATE_TOKEN = 'updateToken'
export const UPDATE_LOGIN_STATUS = 'updateLoginStatus'

export default {
  setFavoriteList(state, value) {
    state.favoriteList = value
  },
  setSearchHistory(state, value) {
    state.searchHistory = value
  },
  setKeyword(state, value) {
    state.keyword = value
  },
  setOrders(state, value) {
    state.orders = value
  },
  setAddress(state, value) {
    state.address = value
  },
  [UPDATE_TOKEN](state, payload) {
    if (payload.token) {
      localStorage.setItem(TOKEN_KEY, payload.token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
    state.token = payload.token
  },
  [UPDATE_LOGIN_STATUS](state, payload) {
    state.isLogin = payload.status
  },
}
