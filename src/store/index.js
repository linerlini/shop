import { createStore, createLogger } from 'vuex'
import userModule from './modules/user'
import createState from './state'
import mutations from './mutations'
import * as getters from './getters'
import actions from './actions'

const debug = process.env.NODE_ENV !== 'production'
export default createStore({
  modules: {
    userModule,
  },
  createState,
  mutations,
  actions,
  getters,
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
})
