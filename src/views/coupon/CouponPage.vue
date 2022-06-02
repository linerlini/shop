<template>
  <div class="page-wrapper">
    <NavBar title="我的优惠卷" left-arrow placeholder safe-area-inset-top @click-left="router.back()"></NavBar>
    <CouponList :exchange-button-loading="exchangeLoading" :show-close-button="false" :coupons="availableCoupons" :disabled-coupons="disabledCoupons" @exchange="handleExchangeCoupon"></CouponList>
  </div>
</template>

<script setup>
import { NavBar, Notify, CouponList } from 'vant'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { ResponseCode } from 'config/constants'
import { useStore } from 'vuex'
import { requestAddCoupon } from 'server/user'
import { ADD } from 'store/modules/coupon'

const store = useStore()
const router = useRouter()
const availableCoupons = computed(() => store.state.couponModule.availableCoupons)
const disabledCoupons = computed(() => store.state.couponModule.disabledCoupons)

const exchangeLoading = ref(false)
async function handleExchangeCoupon(code) {
  exchangeLoading.value = true
  const result = await requestAddCoupon(code)
  if (result.code === ResponseCode.SUCCESS) {
    const { data } = result
    store.commit(`couponModule/${ADD}`, { coupon: data })
  } else {
    Notify(result.msg)
  }
  exchangeLoading.value = false
}
</script>
<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
