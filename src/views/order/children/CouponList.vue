<template>
  <Popup :show="visible" round position="bottom" close-on-popstate :close-on-click-overlay="false" style="height: 80%; padding-top: 4px">
    <CouponList
      ref="couponListRef"
      :chosen-coupon="chosenCouponIndex"
      :coupons="coupons"
      :disabled-coupons="disabledCoupons"
      :show-exchange-bar="false"
      :show-close-button="true"
      @change="handleSelectCoupon"
    >
    </CouponList>
  </Popup>
</template>

<script setup>
import { Popup, CouponList } from 'vant'
import { ref } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
  },
  coupons: {
    type: Array,
    default() {
      return []
    },
  },
  disabledCoupons: {
    type: Array,
    default() {
      return []
    },
  },
})
const emit = defineEmits(['change', 'close'])
const chosenCouponIndex = ref(-1)
function handleSelectCoupon(index) {
  const id = props.coupons[index].uuid
  chosenCouponIndex.value = index
  emit('change', id)
  emit('close')
}
const couponListRef = ref(null)
// fixme 离大谱的垃圾vant组件，没给底部按钮暴露event 傻逼
</script>
<style lang="scss" scoped></style>
