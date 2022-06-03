const initState = {
  selectedGoods: [],
}

export const UPDATE_FIELD = 'updateField'

const orderModule = {
  namespaced: true,
  state() {
    return { ...initState }
  },
  mutations: {
    [UPDATE_FIELD](state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },
}

export default orderModule
