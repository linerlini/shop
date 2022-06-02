<template>
  <RecommendHeader />
  <VanNoticeBar v-if="showNotice" scrollable background="#00AFEC" mode="closeable" text="尊敬的用户，欢迎您的到来！！"></VanNoticeBar>
  <div class="swiper-wrapper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in swipeImages" :key="item.uuid" @click="handleClickSwipe(item.goodID)">
        <img :src="item.imgURL" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="jieshao"></div>
  <GoodFlow :goods="goods" :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @loadMore="handleLoadMore"></GoodFlow>
</template>

<script setup>
import { Swipe as vanSwipe, SwipeItem as vanSwipeItem, NoticeBar as VanNoticeBar, Notify } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GoodFlow from 'components/good_flow/GoodFlow'
import { requestRecommendGood, requestSwipeData } from 'server/recommend'
import { ResponseCode } from 'config/constants'
import { useGoodList } from 'hooks/'
import RecommendHeader from './children/RecommendHeader'

const router = useRouter()

// 通知栏
const showNotice = ref(true)
setTimeout(() => {
  showNotice.value = false
}, 8000)
// 轮播图
const swipeImages = ref([])
const handleClickSwipe = (id) => {
  router.push({
    path: `/good/${id}`,
  })
}
// 推荐商品
const { goods, loadingMore, loadingError, finished, handleLoadMore } = useGoodList({
  requestFunc: requestRecommendGood,
})
async function initData() {
  const result = await requestSwipeData()
  if (result.code === ResponseCode.SUCCESS) {
    swipeImages.value = result.data
  } else {
    Notify(result.msg)
  }
}
initData()
</script>
<style lang="scss" scoped>
.van-notice-bar__content {
  text-align: center;
}
.van-swipe {
  border-radius: 10px;
  width: 96%;
}
.van-swipe-item {
  img {
    width: 100%;
  }
}
.jieshao {
  width: 100%;
  height: 32px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgb(246, 246, 246);
  background-image: url(https://m.360buyimg.com/babel/jfs/t1/165136/31/5175/21843/6017ed55E882e1fa9/06e0bbcbdc774c4f.jpg!q70.dpg.webp);
}
.swiper-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  background-image: linear-gradient(to bottom, #00afec, #f6f6f6);
}
</style>
