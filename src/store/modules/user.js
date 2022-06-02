const initState = {
  account: '',
  name: '尚未登录',
  avatar: '',
  desc: '',
  integration: 0,
}
// mutations
export const RESET_USER = 'resetUser'
export const UPDATE_USER = 'updateUser'

const userModule = {
  namespaced: true,
  state() {
    return { ...initState }
  },
  mutations: {
    [RESET_USER](state) {
      // eslint-disable-next-line no-unused-vars
      state = { ...initState }
    },
    [UPDATE_USER](state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
}

export default userModule
