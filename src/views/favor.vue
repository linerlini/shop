<template>
  <div class="favor">
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click="back"
    />
      <goodVue :lists='favorList'></goodVue>
  </div>

</template>
<script setup>
import { NavBar as vanNavBar } from 'vant'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import goodVue from '../components/good/good.vue'

const store = useStore()
const router = useRouter()
// console.log(store.state.favoriteList)
const favorList = computed(() => store.state.favoriteList)
const back = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.favor {
  width: 100%;
  min-height: 100%;
  z-index:2000;
  position: absolute;
  background-color: #F4F4F4;
}
</style>
