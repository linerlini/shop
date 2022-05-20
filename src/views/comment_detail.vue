<template>
<div class="commentAll">
    <div class="header">
      <van-nav-bar
    title="商品评价"
    left-text="返回"
    right-text="更多"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  </div>
  <div class="body">
    <commentVue class="haha" v-for="(comment,index) in comments" :key="index" :comment = "comment"></commentVue>
  </div>
</div>
</template>
<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { NavBar as vanNavBar, Toast } from 'vant'
import commentVue from '../components/comment/comment.vue'
import { getAllComment } from '../../server/good'
import { useRoute } from 'vue-router'

const route = useRoute()
const comments = ref(null)
const emit = defineEmits(['closeCommentAll'])

const onClickLeft = () => {
  emit('closeCommentAll')
}

const onClickRight = () => {
  Toast.loading({
    message: '敬请期待',
    forbidClick: true
  })
}

onMounted(async () => {
  comments.value = await getAllComment({ id: route.params.id })
})
</script>
<style lang="scss" scoped>
.haha {
  margin-bottom: 20px;
}
.commentAll {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #F7F7F7;
  .header {
    margin-bottom: 20px;
  }
  // .header {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   z-index: 3000;
  //   margin-bottom: 20px;
  // }
}
</style>
