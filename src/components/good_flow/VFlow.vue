<template>
  <PullRefresh :disabled="true">
    <List :loading="loadingMore" :error="loadingError.error" :finished="finished" :error-text="loadingError.msg" :immediate-check="true" @load="handleLoadMore">
      <slot></slot>
    </List>
  </PullRefresh>
</template>

<script setup>
import { PullRefresh, List } from 'vant'

defineProps({
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
const emit = defineEmits(['loadMore', 'refresh'])

function handleLoadMore() {
  emit('loadMore')
}
</script>
<style lang="scss" scoped></style>
