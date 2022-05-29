<template>
  <div class="page-wrapper">
    <Tabs v-model:active="activeCategory">
      <Tab :title="GoodType.FRUIT" :name="GoodType.FRUIT"></Tab>
      <Tab :title="GoodType.VEGETABLES" :name="GoodType.VEGETABLES"></Tab>
    </Tabs>
    <div class="flow-wrapper">
      <GoodFlow :goods="goods" :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @load-more="handleLoadMore"></GoodFlow>
    </div>
  </div>
</template>

<script setup>
import { Tabs, Tab } from 'vant'
import { ref } from 'vue'
import { GoodType } from 'config/constants'
import { requestGoodList } from 'server/good'
import { useGoodList } from 'hooks/index'
import GoodFlow from 'components/good_flow/GoodFlow'

const activeCategory = ref(GoodType.FRUIT)
const { goods, loadingMore, loadingError, finished, handleLoadMore } = useGoodList({ requestFunc: requestGoodList, goodType: activeCategory })
handleLoadMore()
</script>
<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 51px);
  overflow: hidden;
  .flow-wrapper {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
