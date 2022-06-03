<template>
  <div class="commentAll">
    <div class="header">
      <van-nav-bar title="商品评价" left-text="返回" right-text="更多" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    </div>
    <div class="body">
      <commentVue v-for="(comment, index) in comments" :key="index" class="haha" :comment="comment"></commentVue>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { NavBar as vanNavBar, Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import commentVue from 'components/comment/comment'
import { requestGoodDetail } from 'server/good'
import { ResponseCode } from 'config/constants'

const route = useRoute()
const router = useRouter()
const comments = ref([])

const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  Toast.loading({
    message: '敬请期待',
    forbidClick: true,
  })
}

async function initData() {
  const result = await requestGoodDetail(route.query.id)
  if (result.code === ResponseCode.SUCCESS) {
    comments.value = result.data.goodDetail.comments
  }
}
initData()
</script>
<style lang="scss" scoped>
.haha {
  margin-bottom: 20px;
}
.commentAll {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* background-color: #f7f7f7; */
  .header {
    margin-bottom: 20px;
    flex: 0;
  }
  .body {
    flex: 1;
    overflow: auto;
    padding: 0 16px;
  }
}
</style>
