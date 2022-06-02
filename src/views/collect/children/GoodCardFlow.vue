<template>
  <VFlow :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @load-more="handleLoadMore">
    <div class="flow-wrapper">
      <SwipeCell v-for="item in goods" :key="item.uuid">
        <Card :price="item.goodInfo.price" :title="item.goodInfo.title" :thumb="item.goodInfo.goodImg" @click-thumb="handleClickThumb(item.goodId)">
          <template #tags>
            <Tag plain type="danger">
              {{ item.goodInfo.type }}
            </Tag>
            <Tag plain type="danger">
              {{ item.goodInfo.goodType }}
            </Tag>
          </template>
        </Card>
        <template #right>
          <Button square text="删除" type="danger" class="delete-btn" @click="handleClickDelete(item.goodId)"></Button>
        </template>
      </SwipeCell>
    </div>
  </VFlow>
</template>

<script setup>
import { SwipeCell, Card, Button, Tag } from 'vant'
import VFlow from 'components/good_flow/VFlow'

defineProps({
  goods: {
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
function handleClickThumb(id) {
  emit('clickGoodImg', id)
}
function handleClickDelete(id) {
  console.log(id)
  emit('delete', id)
}
</script>
<style lang="scss" scoped>
.flow-wrapper {
  .delete-btn {
    height: 100%;
  }
}
</style>
