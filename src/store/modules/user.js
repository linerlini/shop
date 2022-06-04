import { add } from 'utils/'

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
export const CHANGE_MOENY = 'changeMoney'
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
    [CHANGE_MOENY](state, { spend }) {
      state.integration = add(state.integration, spend)
    },
  },
}

export default userModule
