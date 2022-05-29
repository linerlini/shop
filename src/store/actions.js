import { UPDATE_TOKEN, UPDATE_LOGIN_STATUS } from './mutations'
import { UPDATE_USER } from './modules/user'

export const INIT_LOGIN = 'initLogin'

const actions = {
  [INIT_LOGIN]({ commit }, payload) {
    commit(UPDATE_TOKEN, { token: payload.token })
    commit(UPDATE_LOGIN_STATUS, { status: true })
    commit(`userModule/${UPDATE_USER}`, {
      ...payload.userInfo,
    })
  },
}
export default actions
