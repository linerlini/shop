const initState = {
  addressList: [],
  addressListLoadStatus: 'pending',
  selectedAddressID: '',
  isChoosingAddress: false,
}
// mutations
export const ADD_ADDRESS = 'addAddress'
export const EDIT_ADDRESS = 'editAddress'
export const DELETE_ADDRESS = 'deleteAddress'
export const UPDATE_SELECT_ADDRESS = 'updateSelectedAddressId'
export const UPDATE_CHOOS_ADDRESS_STATUS = 'updateIsChoosingAddress'
export const UPDATE_FIELD = 'updateField'
export const RESET = 'reset'
const addressModule = {
  namespaced: true,
  state() {
    return { ...initState }
  },
  mutations: {
    [ADD_ADDRESS](state, payload) {
      const { isDefault } = payload
      const newAddressList = [...state.addressList]
      if (isDefault) {
        const oldDefaultAddressIndex = newAddressList.findIndex((item) => item.isDefault)
        if (oldDefaultAddressIndex !== -1) {
          const oldDefaultAddress = newAddressList[oldDefaultAddressIndex]
          oldDefaultAddress.isDefault = false
        }
      }
      newAddressList.push({ ...payload, address: payload.addressDetail })
      state.addressList = newAddressList
    },
    [EDIT_ADDRESS](state, payload) {
      const { id, addressData } = payload
      const targetIndex = state.addressList.findIndex((item) => item.uuid === id)

      if (targetIndex !== -1) {
        const newAddressList = state.addressList.slice()
        if (addressData.isDefault && !state.addressList[targetIndex].isDefault) {
          const oldDefaultAddressIndex = state.addressList.findIndex((item) => item.isDefault)
          if (oldDefaultAddressIndex !== -1) {
            const oldDefaultAddress = newAddressList[oldDefaultAddressIndex]
            oldDefaultAddress.isDefault = false
            newAddressList.splice(oldDefaultAddressIndex, 1, oldDefaultAddress)
          }
        }
        newAddressList.splice(targetIndex, 1, { ...addressData, address: addressData.addressDetail })
        state.addressList = newAddressList
      }
    },
    [DELETE_ADDRESS](state, payload) {
      const targetIndex = state.addressList.findIndex((item) => item.uuid === payload)
      if (targetIndex !== -1) {
        const newAddressList = state.addressList.slice()
        newAddressList.splice(targetIndex, 1)
        state.addressList = newAddressList
      }
    },
    [UPDATE_SELECT_ADDRESS](state, payload) {
      state.selectedAddressID = payload
    },
    [UPDATE_CHOOS_ADDRESS_STATUS](state, payload) {
      state.isChoosingAddress = payload
    },
    [UPDATE_FIELD](state, payload) {
      Object.keys(payload).forEach((item) => {
        state[item] = payload[item]
      })
    },
    [RESET](state) {
      // eslint-disable-next-line no-unused-vars
      state = {
        ...initState,
      }
    },
  },
  getters: {
    selectedAddressInfo(state) {
      return state.addressList.find((item) => item.uuid === state.selectedAddressID)
    },
  },
}

export default addressModule
