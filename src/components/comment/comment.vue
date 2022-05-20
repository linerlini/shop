<template>
  <div class="comment1">
    <div class="first">
      <img src="//img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png">
      <span class="username">{{props.comment.username}}</span>
      <span class="rate" v-for="i in props.comment.rate" :key="i"></span>
      <span class="date">{{props.comment.date.slice(0,10)}}</span>
    </div>
    <p class="second">{{props.comment.text}}</p>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  comment: Object
})
</script>
<style lang="scss" scoped>
.comment1 {
  margin-bottom: 15px;
  width: 100%;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.103);
  .second {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    // display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    line-height: 1.5;
    max-height: 126px;
    overflow: hidden;
    position: relative;
    white-space: normal;
    word-break: break-all;
    margin: 5px auto;
    width: 80%;
  }
  .first {
    width: 80%;
    font-size: 12px;
    line-height: 20px;
    margin: 0 auto;
    img {
    border-radius: 50%;
    height: 20px;
    vertical-align: middle;
    width: 20px;
    margin-right: 10px;
    }
    .rate {
      display: inline-block;
      height: 10px;
      margin: -2px 0 -2px 6px;
      position: relative;
      vertical-align: middle;
      width: 5px;
      &:before {
        background-image: url(//jstatic.3.cn/static/star.3fe1db83.png?__inline);
        background-size: cover;
        content: "";
        display: inline-block;
        height: 10px;
        margin-right: 2px;
        position: absolute;
        top: 0;
        width: 10px;
      }
    }
    .date {
      color: #999;
      float: right;
      margin-left: -60px;
    }
    }
}
</style>
