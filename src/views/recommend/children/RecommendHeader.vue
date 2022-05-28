<template>
  <div class="header">
    <div class="left" @click="clickLeft">
      <span class="iconfont icon-fen_lei2 icon"></span>
    </div>
    <div class="center">
      <van-search shape="round" background="rgb(0,175,236)" placeholder="请输入搜索关键词" @focus="onFocus" />
    </div>
    <div class="right" @click="clickRight">
      <span class="iconfont icon-xiangji icon"></span>
    </div>
  </div>
  <van-overlay :show="show" @click="closeOverlay">
    <div class="wrapper">
      <div class="block" @click.stop>
        <qrcodeVue v-if="show"></qrcodeVue>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { Search as vanSearch, Overlay as VanOverlay } from 'vant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import qrcodeVue from 'components/qrcode/qrcode'

const show = ref(false)
const router = useRouter()

const onFocus = () => {
  router.push({
    path: 'search',
  })
}
const clickLeft = () => {
  router.push({
    path: 'sort',
  })
}
const clickRight = () => {
  show.value = true
}
const closeOverlay = () => {
  show.value = false
}
</script>
<style lang="scss" scoped>
.van-overlay {
  z-index: 1002;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 200px;
  height: 200px;
  background-color: #fff;
}
.header {
  display: flex;
  .left {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00afec;
    .icon::before {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
  .center {
    width: 70%;
  }
  .right {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00afec;
    .icon::before {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
