import { CouponTimeStatus, validateCouponTime } from 'utils/index'

const initState = {
  availableCoupons: [],
  disabledCoupons: [],
}
// mutations
export const UPDATE_FIELD = 'updateField'
export const INIT = 'init'
export const ADD = 'add'
export const RESET = 'reset'
export const USE = 'use'
function formatCoupon(coupon) {
  const formatData = { ...coupon }
  formatData.id = coupon.uuid

  formatData.startAt = new Date(coupon.startAt).valueOf() / 1000
  formatData.endAt = new Date(coupon.endAt).valueOf() / 1000
  return formatData
}
const couponModule = {
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
    [INIT](state, coupons) {
      const availableCoupons = []
      const disabledCoupons = []
      coupons.forEach((item) => {
        const { status, startAt, endAt } = item
        const formatItem = formatCoupon(item)
        if (status === 0) {
          formatItem.reason = '已使用'
          disabledCoupons.push(formatItem)
        } else {
          const couponStatus = validateCouponTime(startAt, endAt)
          if (couponStatus === CouponTimeStatus.BEFORE) {
            formatItem.reason = '未到使用时间'
            disabledCoupons.push(formatItem)
          } else if (couponStatus === CouponTimeStatus.OUT) {
            formatItem.reason = '已过期'
            disabledCoupons.push(formatItem)
          } else {
            availableCoupons.push(formatItem)
          }
        }
      })
      state.availableCoupons = availableCoupons
      state.disabledCoupons = disabledCoupons
    },
    [ADD](state, payload) {
      const { coupon } = payload
      const validateStatus = validateCouponTime(coupon.startAt, coupon.endAt)
      const formatData = formatCoupon(coupon)
      if (validateStatus === CouponTimeStatus.BEFORE) {
        formatData.reason = '未到使用时间'
        state.disabledCoupons.unshift(formatData)
      }
      if (validateStatus === CouponTimeStatus.AVAILABLE) {
        state.availableCoupons.unshift(coupon)
      }
    },
    [RESET](state) {
      state.availableCoupons = []
      state.disabledCoupons = []
    },
    [USE](state, id) {
      const targetIndex = state.availableCoupons.findIndex((item) => item.uuid === id)
      const target = state.availableCoupons[targetIndex]
      state.availableCoupons.splice(targetIndex, 1)
      state.disabledCoupons.unshift({ ...target, status: 0, reason: '已使用' })
    },
  },
  getters: {},
}

export default couponModule
