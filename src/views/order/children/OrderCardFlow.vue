<template>
  <VFlow :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @load-more="handleLoadMore">
    <div class="flow-wrapper">
      <OrderCard v-for="order in orders" :key="order.uuid" :order-id="order.uuid" :total="order.total" :status="order.status" :goods="order.goods"> </OrderCard>
    </div>
  </VFlow>
</template>

<script setup>
import VFlow from 'components/good_flow/VFlow'
import OrderCard from './OrderCard'

defineProps({
  orders: {
    type: Array,
    default() {
      return []
    },
  },
  finished: {
    type: Boolean,
    default: false,
  },
  loadingMore: {
    type: Boolean,
    default: false,
  },
  loadingError: {
    type: Object,
    default() {
      return {
        error: false,
        msg: '',
      }
    },
  },
})
const emit = defineEmits(['loadMore', 'clickGoodImg', 'delete'])

function handleLoadMore() {
  emit('loadMore')
}
</script>
<style lang="scss" scoped>
.flow-wrapper {
  .delete-btn {
    height: 100%;
  }
}
</style>
