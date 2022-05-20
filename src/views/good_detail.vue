<template>
  <div v-if="is" class="good_detail">
  <div id="scrollGood_detail" class="title_wrapper">
    <!-- <div style="width:100%; height: 45px"></div> -->
    <div class="header">
    <div class="back" @click="back"><span></span></div>
    <ul class="nav">
      <li title="good" @click="goGood"><span>商品</span></li>
      <li title="comment" @click="goComment"><span>评价</span></li>
      <li title="detail" @click="goDetail"><span>详情</span></li>
      <li title="recommend" @click="goRecommend"><span>推荐</span></li>
    </ul>
    <div class="more" @click="showShare = true"><span></span></div>
  </div>
  <div class="lunbotu">
    <van-swipe van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image,index) in goodDetail.src" :key="index">
          <img :src="image" @click="preview(index)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="title">
    <span class="price">
      ¥
      <em>188</em>
      <span class="price_decimals">.00</span>
    </span>
    <div class="name">{{goodDetail.title}}</div>
  </div>
  </div>

  <div id="scrollComment" class="comment">
    <div class="title">
      <h3 class="left">评论</h3>
      <p class="right" v-if="comments.length" @click="toComment">查看全部</p>
      <i v-if="comments.length"></i>
    </div>
    <div v-if="!comments.length" class="nocomment">暂无更多评论</div>
    <commentVue v-for="(item,index) in comments" :comment="item" :key="index"></commentVue>
  </div>

  <div id="scrollDetail" class="params">
    <div class="title">详情</div>
    <ul class="param">
      <li v-for="(value,name,index) in goodDetail.params" :key="index">
      <span class="left">{{name}}</span>
      <span class="right">{{value}}</span></li>
    </ul>
  </div>
  <div class="images_wrapper">
    <img v-for="(image,index) in goodDetail.images" @click="preview1(index)" :src="image" :key="index" alt="">
  </div>
  <div id="scrollRecommend" class="recommend">
    <recommend1></recommend1>
  </div>
  <div class="good_detail_actionBar">
    <actionBar :good="goodDetail" @clickBar="showAction1"></actionBar>
  </div>
  </div>

  <div class="commentAll" v-if="fullScreen">
    <commentDetailVue @closeCommentAll="closeCommentAll"></commentDetailVue>
  </div>

    <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
    @select="onSelect"
  />
  <div class="actionbar">
    <van-action-sheet v-model:show="showAction">
    <div class="total">
      <div class="num">
        <div class="left">数量</div>
        <div class="right"><Stepper v-model="num"></Stepper></div>
      </div>
      <van-button type="primary" size="small" @click="addOrder" block round color="#00AFEC">确定</van-button>
    </div>
  </van-action-sheet>
  </div>
</template>
<script setup>
// import { useStore } from 'vuex'
// import { computed } from '@vue/reactivity'
// const store = useStore()
import { ref, watch, onBeforeMount } from 'vue'
import { Stepper, ActionSheet as vanActionSheet, ImagePreview, Swipe as vanSwipe, SwipeItem as vanSwipeItem, ShareSheet as vanShareSheet, Toast, Button as vanButton } from 'vant'
import commentVue from '../components/comment/comment.vue'
import recommend1 from '../components/recommend/recommend1.vue'
import actionBar from '../components/actionBar/actionBar'
import { useRouter, useRoute } from 'vue-router'
import { getComment, getGoodDetail } from '../../server/good'
import { useStore } from 'vuex'

import commentDetailVue from './comment_detail.vue'

const router = useRouter()
const store = useStore()
const route = useRoute()
const comments = ref([])
const goodDetail = ref([])
const is = ref(false)
const fullScreen = ref(false)
const showAction = ref(false)
const num = ref(1)

watch(() => route.params.id, async (newId) => {
  is.value = false
  if (!newId) {
    // router.push({
    //   path: '/recommend'
    // })
    return
  }
  goodDetail.value = await getGoodDetail({ id: route.params.id })
  if (goodDetail.value.status) {
    router.push({
      path: '/recommend'
    })
    return
  }
  comments.value = await getComment({ id: route.params.id })
  is.value = true
})

const showAction1 = () => {
  // console.log('1')
  showAction.value = true
}

const addOrder = () => {
  const arr = [{ ...goodDetail.value, num: num.value }]
  store.commit('setOrders', arr)
  router.push({
    path: '/order'
  })
}
onBeforeMount(async () => {
  is.value = false
  // console.log(route.params.id + '!')
  goodDetail.value = await getGoodDetail({ id: route.params.id })
  if (goodDetail.value.status) {
    router.push({
      path: '/recommend'
    })
    return
  }
  comments.value = await getComment({ id: route.params.id })
  is.value = true
})

const toComment = () => {
  // router.push(`/good/${route.params.id}/comment`)
  fullScreen.value = true
}
const goGood = () => {
  document.getElementById('scrollGood_detail').scrollIntoView()
  window.scrollBy(0, -45)
}
const goComment = () => {
  document.getElementById('scrollComment').scrollIntoView()
  window.scrollBy(0, -45)
}
const goDetail = () => {
  document.getElementById('scrollDetail').scrollIntoView()
  window.scrollBy(0, -45)
}
const goRecommend = () => {
  document.getElementById('scrollRecommend').scrollIntoView()
  window.scrollBy(0, -45)
}
const preview = (index) => {
  ImagePreview({
    images: goodDetail.value.src,
    startPosition: index
  })
}
const preview1 = (index) => {
  ImagePreview({
    images: goodDetail.value.images,
    startPosition: index
  })
}

const closeCommentAll = () => {
  fullScreen.value = false
}
const showShare = ref(false)
const options = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' }
]

const onSelect = (option) => {
  Toast(option.name)
  showShare.value = false
}

const back = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.van-action-sheet__content {
  .total {
    padding: 20px;
    .num {
      padding-bottom: 20px;
      overflow: hidden;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
}
.commentAll {
  position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
}
.van-swipe {
    margin-top: 45px;
}
.van-swipe-item {
    img {
        width: 100%;
    }
}
// .good_detail_actionBar {
  // position: fixed;
  // z-index: 2002;
  // left: 0;
  // top:0;
  // width: 100%;
  // height: 45px;
// }
.good_detail {
  position: absolute;
  top:0;
  left:0;
  z-index:2000;
  width: 100%;
  // height: 100%;
  background-color: rgb(242,242,242);
  .recommend {
    border-top: 1px solid rgba(0, 0, 0, 0.096);
    border-radius: 12px;
    margin-top: 15px;
    background-color: rgb(242,242,242);
  }
  .images_wrapper {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .comment {
    // margin:0 15px;
    margin: 12px 0px;
    border-radius: 12px;
    background-color: rgb(255,255,255);
    overflow: hidden;
    .nocomment {
      width: 100%;
      height: 45px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
    }
    .title {
      color: #262626;
      height: 35px;
      line-height: 35px;
      margin-top: 3px;
      padding-left: 8px;
      position: relative;
      .left {
        font-size: 15px;
        font-weight: 700;
        position: absolute;
        left:37px;
        top:0;
      }
      .right {
        position: absolute;
        right: 35px;
        top:0px;
        color: #8c8c8c;
      }
      i {
        background: url(//jstatic.3.cn/static/icon_arrow_v2.2bf2ffbc.png?__inline) no-repeat;
        background-size: cover;
        height: 12px;
        margin-top: -1px;
        position: absolute;
        right: 10px;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
      }
    }
  }
  .params {
    // margin-top: 15px;
    border-radius: 15px;
    background-color: rgb(255,255,255);
    overflow: hidden;
    padding-bottom: 15px;
    .title {
      margin: 15px;
      font-size: 16px;
      font-weight:600;
    }
    .param {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 90%;
      margin: 0 auto;
      border-top: 1px solid rgba(0, 0, 0, 0.123);
      border-left: 1px solid rgba(0, 0, 0, 0.123);
      border-radius: 5px;
      li{
        display: flex;
        width: 100%;
        .left {
        width: 35%;
        height: 30px;
        line-height: 30px;
        background-color: rgb(242,242,242);
        text-indent: 2em;
        // border: 0px 1px 1px 0px solid black;
        border-right: 1px solid rgba(0, 0, 0, 0.123);
        border-bottom: 1px solid rgba(0, 0, 0, 0.123);
      }
        .right {
          height: 30px;
          line-height: 30px;
          width: 65%;
          text-indent: 2em;
          // border: 0px 1px 1px 0px solid black;
          border-right: 1px solid rgba(0, 0, 0, 0.123);
          border-bottom: 1px solid rgba(0, 0, 0, 0.123);
        }
      }
    }
  }
  .title_wrapper {
    border-radius: 0 0 15px 15px;
    background-color: rgb(255,255,255);
    padding-bottom: 10px;
  }
  .header {
    position: fixed;
    z-index: 2002;
    left: 0;
    top:0;
    width: 100%;
    height: 45px;
    display: flex;
    overflow: hidden;
    background-color: rgb(255,255,255);
    .back {
      width: 40px;
      height: 44px;
      margin-right: 25px;
      span {
        display: block;
        margin: 12px 0 0 10px;
        width: 20px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==) no-repeat 50%;
        background-position: 0 0;
        background-size: contain;
      }
    }
    .more {
      width: 40px;
      height: 44px;
      margin-left: 25px;
      span {
        display: block;
        margin: 20px 12px 12px 10px;
        width: 20px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAMCAYAAAG2I8urAAAAAXNSR0IArs4c6QAAAddJREFUSA3VVr1OwzAQto0oqgQPABszD4BY4TVIfwR0aBgQb8ALIAbSoVD1J7wGrFRiAokVsbGwMSAVCXPn4PSSxklMGol6SM539913/jnbjEFzGu0j/GOTUvJACr5Owx0L5SBZVxtqDffbqbel7gNqG6K441ABglN3PyJ9YBHKk2qZXNVdzcJVJAwJzR92IvmgjlLH7RSrBhNPAwPohs508FqPf5wIjQVhOtg0xrgNA1GsQIW5yZ7ZFrVwTA+XIaLm/M4feHsRXUKnDOzSy+s7Lnclxrf59PhwFtPNdMvACn/orTGYEcpWXals0L5JLgOrtnGwx/k54+x51L/c4ZxPq8iUza9+3liss1vY57uUdzTwRJ6kysDi6RBJBhOrNY/vaYJGuQRscrlKtmVMIstQEJucEJenWbxGe0GsmKkodQZ1royExFAGVlVZq3Wy/jn5uknaT4ofkqxWlve73Ys3kk9hcRF4oerhtieXeeqoOWv5g3yrmRoHjIvCC6cQnM95m41vVkybWDa+c+YVeHllxQztNr4hyCDYxLLxNdCFaptY4CvwZo8/PcJgVIBzSPlSXQF5UXjDF716iTbdQ8b4AZxJwb2qZlv2Rn3vOs9L5C/z9d95fwDELzC7i+rQHQAAAABJRU5ErkJggg==) no-repeat 50%;
        background-position: 0 0;
        background-size: contain;
      }
    }
    .nav {
      display: flex;
      flex: 1;
      text-align: center;
      li {
        flex: 1;
        span {
          line-height: 45px;
          font-size: 14px;
        }
      }
    }
  }
  .title {
    margin-top: 12px;
    margin-bottom: 0;
    padding: 0 18px;
    line-height: 20px;
    margin-bottom: 5px;
    font-size: 12px;
    .name {
      // padding: 12px 18px;
      font-weight: 700;
      line-height: 21px;
      font-size: 16px;
      // margin-bottom: 30px;
    }
    .price {
      font-size: 16px;
      line-height: 30px;
      color: #f2270c;
      display: inline-block;
    }
    em {
      font-size: 30px;
      font-style: normal
    }
    .price_decimals{
      font-size: 18px;
    }
  }
}
</style>
