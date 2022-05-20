<template>
    <Header></Header>
    <VanNoticeBar scrollable v-if="showNotice" background="#00AFEC" mode="closeable" text="尊敬的用户，欢迎您的到来！！"></VanNoticeBar>
    <div class="jianbian">
        <van-swipe :autoplay="3000">
        <van-swipe-item v-for="image in images" :key="image" @click="clickSwipe">
            <img :src="image" />
        </van-swipe-item>
        </van-swipe>
    </div>
    <div class="jieshao"></div>
    <Recommend1 />
</template>

<script setup>
import Header from '../components/header/header'
import Recommend1 from '../components/recommend/recommend1'
import { Swipe as vanSwipe, SwipeItem as vanSwipeItem, NoticeBar as VanNoticeBar } from 'vant'
import { onMounted, ref } from 'vue'
import { getLunbo } from '../../server/getLunbo'
import { useRouter } from 'vue-router'

const images = ref([])
const showNotice = ref(true)
const router = useRouter()

const clickSwipe = () => {
  router.push({
    path: '/good/d5e1bf6d-f7ca-4510-bdfa-c567e27a4f63'
  })
}

setTimeout(() => {
  showNotice.value = false
}, 8000)
onMounted(async () => {
  images.value = await getLunbo({ num: '1' })
})
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
  background-color: rgb(246,246,246);
  background-image: url(https://m.360buyimg.com/babel/jfs/t1/165136/31/5175/21843/6017ed55E882e1fa9/06e0bbcbdc774c4f.jpg!q70.dpg.webp);
}
.jianbian {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 130px;
    background-image: linear-gradient(to bottom, #00afec, #f6f6f6);
}
</style>
