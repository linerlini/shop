import { UPDATE_TOKEN, UPDATE_LOGIN_STATUS } from './mutations'
import { RESET_USER, UPDATE_USER } from './modules/user'
import { INIT, RESET as RESET_COUPON } from './modules/coupon'
import { RESET as RESET_ADDRESS } from './modules/address'

export const INIT_LOGIN = 'initLogin'
export const LOG_OUT = 'logOut'

const actions = {
  [INIT_LOGIN]({ commit }, payload) {
    commit(UPDATE_TOKEN, { token: payload.token })
    commit(UPDATE_LOGIN_STATUS, { status: true })
    commit(`userModule/${UPDATE_USER}`, {
      ...payload.userInfo,
    })
    commit(`couponModule/${INIT}`, payload.coupons)
  },
  [LOG_OUT]({ commit }) {
    commit(`userModule/${RESET_USER}`)
    commit(`addressModule/${RESET_ADDRESS}`)
    commit(`couponModule/${RESET_COUPON}`)
    commit(UPDATE_TOKEN, { token: '' })
    commit(UPDATE_LOGIN_STATUS, { status: false })
  },
}
export default actions
