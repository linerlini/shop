<template>
  <div class="page-wrapper">
    <NavBar class="nav-bar" title="我的订单" left-arrow safe-area-inset-top @click-left="router.back()"></NavBar>
    <Tabs :active="activeOrderStatus" @click-tab="handleTabChange">
      <Tab v-for="item in tabList" :key="item.name" :title="item.title" :name="item.name"></Tab>
    </Tabs>
    <div class="content">
      <OrderCardFlow :orders="goods" :finished="finished" :loading-more="loadingMore" :lodaing-error="loadingError" @cancel="handleCancelOrder"></OrderCardFlow>
    </div>
  </div>
</template>
<script setup>
import { Tabs, Tab, NavBar } from 'vant'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OrderStatus } from 'config/constants'
import { useGoodList } from 'hooks/'
import { requestOrderList } from 'server/order'
import OrderCardFlow from './children/OrderCardFlow'

const router = useRouter()
const route = useRoute()
const tabList = [
  {
    title: '全部',
    name: 'all',
  },
  {
    title: '待付款',
    name: OrderStatus.FOR_PAYMENT,
  },
  {
    title: '待发货',
    name: OrderStatus.WAITDELIVER,
  },
  {
    title: '待收货',
    name: OrderStatus.FOR_GOODS,
  },
  {
    title: '待评价',
    name: OrderStatus.TO_EVALUATE,
  },
]
const activeOrderStatus = computed(() => route.query.type || 'all')
const handleTabChange = (params) => {
  router.push({ query: { type: params.name } })
}

const { goods, loadingMore, loadingError, finished, handleLoadMore, count } = useGoodList({
  requestFunc: requestOrderList,
  type: activeOrderStatus,
})
handleLoadMore()

function handleCancelOrder(id) {
  if (activeOrderStatus.value === 'all') {
    return
  }
  count.value -= 1
  const targetIndex = goods.value.findIndex((item) => item.uuid === id)
  goods.value.splice(targetIndex, 1)
}
</script>
<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content {
    flex: 1;
    overflow: auto;
    background: #f7f8fa;
    padding: 20px 8px;
  }
}
</style>
