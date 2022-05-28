<template>
  <PullRefresh :disabled="true">
    <List :loading="loadingMore" :error="loadingError.error" :finished="finished" :error-text="loadingError.msg" :immediate-check="false" @load="handleLoadMore">
      <div class="flow-wrapper" @click="handleClickCard">
        <GoodCard v-for="item in props.goods" :key="item.uuid" v-bind="item"></GoodCard>
      </div>
    </List>
  </PullRefresh>
</template>

<script setup>
import { PullRefresh, List } from 'vant'
import { useRouter } from 'vue-router'
import GoodCard from 'components/good_card/GoodCard'

const router = useRouter()

const props = defineProps({
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
  refreshing: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['loadMore', 'refresh'])

function handleLoadMore() {
  emit('loadMore')
}
// function handleRefresh() {
//   emit('refresh')
// }

function handleClickCard(event) {
  const target = event.target.closest('.card-wrapper')
  if (!target) {
    return
  }
  const { id } = target.dataset
  router.push(`/good/${id}`)
}
</script>
<style lang="scss" scoped>
.flow-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 8px;
  width: 100%;
  background-color: rgb(246, 246, 246);
  padding: 0 12px;
}
</style>
