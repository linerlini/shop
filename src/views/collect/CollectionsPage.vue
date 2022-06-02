<template>
  <div class="page-wrapper">
    <NavBar title="我的收藏" left-arrow fixed placeholder safe-area-inset-top @click-left="router.back()"></NavBar>
    <div class="card-list-wrapper">
      <GoodCardFlow
        :goods="goods"
        :finished="finished"
        :loading-more="loadingMore"
        :loading-error="loadingError"
        @delete="handleDeleteCollect"
        @load-more="handleLoadMore"
        @click-good-img="handleClickGoodImg"
      ></GoodCardFlow>
      <Empty v-if="count === 0" description="收藏夹暂无商品!"></Empty>
    </div>
  </div>
</template>

<script setup>
import { NavBar, Notify, Toast, Empty } from 'vant'
import { useRouter } from 'vue-router'
import { useGoodList } from 'hooks/'
import { requestCollect, requestCollectionList } from 'server/good'
import { ResponseCode } from 'config/constants'
import { RouteName } from 'router/'
import GoodCardFlow from './children/GoodCardFlow'

const router = useRouter()

const { goods, loadingMore, loadingError, finished, handleLoadMore, count } = useGoodList({ requestFunc: requestCollectionList })

async function handleDeleteCollect(id) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
  const result = await requestCollect(id, '0')
  if (result.code === ResponseCode.SUCCESS) {
    const targetIndex = goods.value.findIndex((item) => item.goodId === id)
    if (targetIndex !== -1) {
      goods.value.splice(targetIndex, 1)
      count.value -= 1
    }
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
async function handleClickGoodImg(id) {
  router.push({ name: RouteName.GOOD, params: { id } })
}
</script>
<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .card-list-wrapper {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
