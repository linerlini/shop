<template>
  <div class="tuijian"></div>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <Good :lists="goodList"></Good>
    </van-list>
  </van-pull-refresh>
</template>
<script setup>
import { ref } from 'vue'
import { list as vanList, PullRefresh as vanPullRefresh } from 'vant'
import Good from '../good/good'
import { getGoodList } from '../../../server/good'

const goodList = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  if (refreshing.value) {
    goodList.value = []
    refreshing.value = false
  }
  const result = await getGoodList()

  goodList.value = goodList.value.concat(result)

  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  if (goodList.value.length >= 24) {
    finished.value = true
  }
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
</script>
<style lang="scss" scoped>
.tuijian {
  width: 100%;
  height: 47px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgb(246, 246, 246);
  background-image: url(https://m.360buyimg.com/babel/jfs/t1/176630/36/28153/17659/61f35747E803eb041/9802ccf7f9a919bb.jpg!q70.dpg.webp);
}
.van-pull-refresh {
  padding-bottom: 50px;
}
</style>
