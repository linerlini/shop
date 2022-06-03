<template>
  <div class="page-wrapper">
    <NavBar class="nav-bar" :title="pageTitle" left-arrow safe-area-inset-top @click-left="router.back()"></NavBar>
    <div class="sub-page">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { OrderStatus } from 'config/constants'
import { NavBar } from 'vant'
import { computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 标题
const titleMap = {
  [OrderStatus.CONFIRM]: '确认订单',
  [OrderStatus.FOR_PAYMENT]: '待付款',
  [OrderStatus.WAITDELIVER]: '待发货',
  [OrderStatus.FOR_GOODS]: '待收货',
  [OrderStatus.TO_EVALUATE]: '待评价',
  [OrderStatus.REFUND_ING]: '退款中',
  [OrderStatus.REFUND_END]: '已退款',
  [OrderStatus.SUCCESS]: '交易成功',
}
const pageTitle = computed(() => {
  const { name } = route
  return titleMap[name] || '订单'
})
</script>
<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .sub-page {
    flex: 1;
    background-color: #f7f8fa;
    overflow: hidden;
  }
}
</style>
