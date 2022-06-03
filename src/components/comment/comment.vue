<template>
  <div class="comment-box">
    <div class="header">
      <VAvatar :src="comment.avatar" class="avatar">{{ comment.name[0] }}</VAvatar>
      <div class="right">
        <div class="user-info">
          <div class="username">{{ comment.name }}</div>
          <Rate :value="comment.rate" :count="comment.rate" size="14px" color="#ffd21e" void-icon="star" void-color="#ffd21e"></Rate>
        </div>
        <div class="date">{{ formatTime(comment.createdAt) }}</div>
      </div>
    </div>
    <p class="content">{{ comment.content }}</p>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { Rate } from 'vant'
import { formatTime } from 'utils/'
import VAvatar from 'components/VAvatar'

defineProps({
  comment: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>
<style lang="scss" scoped>
.comment-box {
  width: 100%;
  .content {
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
    margin-top: 8px;
  }
  .header {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    .avatar {
      height: 40px;
      width: 40px;
      margin-right: 10px;
      .name-avatar {
        font-size: 24px;
      }
    }
    .right {
      .user-info {
        display: flex;
        align-items: center;
        .username {
          max-width: 50%;
          margin-right: 8px;
        }
      }
    }
    .date {
      color: #999;
      margin-left: auto;
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
