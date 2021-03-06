<template>
  <div class="good_detail">
    <div v-if="loading === LoadStatus.SUCCESS" class="content">
      <div class="header">
        <div class="back" @click="back"><span></span></div>
        <ul class="nav">
          <li @click="navigation('scrollGood_detail')"><span>商品</span></li>
          <li @click="navigation('scrollComment')"><span>评价</span></li>
          <li @click="navigation('scrollDetail')"><span>详情</span></li>
          <li @click="navigation('scrollRecommend')"><span>推荐</span></li>
        </ul>
        <div class="more" @click="showShare = true"><span></span></div>
      </div>
      <div class="main-content">
        <div class="lunbotu">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in goodDetail.goodSwiperImgs" :key="image">
              <img :src="image" @click="previewImg(index, 'swipe')" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <OrderDetailCard id="scrollGood_detail">
          <div class="content">
            <span class="price">
              ¥
              <em>{{ ~~goodDetail.price }}</em>
              <span class="price_decimals">{{ ('.' + (goodDetail.price * 100 - 100 * ~~goodDetail.price)).padEnd(3, '0') }}</span>
            </span>
            <div class="name">{{ goodDetail.title }}</div>
          </div>
        </OrderDetailCard>
        <OrderDetailCard id="scrollComment">
          <template #title>
            <div class="header">
              <h3 class="left">评论({{ comments.length }})</h3>
              <p v-if="comments.length" class="right" @click="toComment">查看全部<Icon name="arrow"></Icon></p>
            </div>
          </template>
          <div>
            <div v-if="!comments.length" class="nocomment">暂无更多评论</div>
            <div v-else class="comments">
              <commentVue v-for="item in comments.slice(0, 2)" :key="item.uuid" :comment="item" class="comment-item"></commentVue>
            </div>
          </div>
        </OrderDetailCard>
        <OrderDetailCard id="scrollDetail">
          <template #title>基本参数</template>
          <ul class="param">
            <li v-for="(value, name) in goodDetail.params" :key="name">
              <span class="left">{{ name }}</span>
              <span class="right">{{ value }}</span>
            </li>
          </ul>
        </OrderDetailCard>
        <div class="images_wrapper">
          <div class="title">详情</div>
          <img v-for="(image, index) in goodDetail.goodInfoImgs" :key="image" :src="image" alt="" @click="previewImg(index, 'info')" />
        </div>
        <div id="scrollRecommend">
          <div class="title">推荐商品</div>
          <GoodFlow :goods="recommendGoods" :finished="finished" :loading-more="loadingMore" :loading-error="loadingError"></GoodFlow>
        </div>
      </div>
      <div class="good_detail_actionBar">
        <GoodActionBar :collected="hasCollected" :shopping-count="shoppingCarCount" @click-bar="handleClickActionBar"></GoodActionBar>
      </div>
    </div>

    <div v-else-if="loading === LoadStatus.ERROR"><Empty image="error" description="网络错误，请重试"></Empty></div>
    <div v-else><Empty description="正在加载"></Empty></div>
  </div>

  <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  <div class="actionbar">
    <AddGoodBar v-model:visible="addGoodBarVisible" :loading="addCarLoading" @submit="handleActionBarSubmit"></AddGoodBar>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { Empty, ImagePreview, Swipe as vanSwipe, SwipeItem as vanSwipeItem, ShareSheet as vanShareSheet, Toast, Notify, Icon } from 'vant'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { requestGoodDetail, requestCollect, requestGoodList } from 'server/good'
import { ResponseCode, LoadStatus } from 'config/constants'
import commentVue from 'components/comment/comment'
import AddGoodBar from 'components/add_to_car_bar/AddGoodBar'
import { requestAddShopCar } from 'server/shopping_car'
import { UPDATE_FIELD } from 'store/modules/order'
import { RouteName } from 'router/'
import OrderDetailCard from 'views/order/children/OrderDetailCard'
import { useGoodList } from 'hooks/'
import GoodFlow from 'components/good_flow/GoodFlow'
import GoodActionBar, { ClickType } from './children/GoodActionBar'

const router = useRouter()
const store = useStore()
const route = useRoute()

const loginStatus = computed(() => store.state.isLogin)
const goodId = computed(() => route.params.id)
const goodDetail = ref({})
const goodType = ref('')
const hasCollected = ref(false)
let collecting = false
const loading = ref(LoadStatus.LOADING)

const comments = ref([])
const shoppingCarCount = ref(0)
const addGoodBarVisible = ref(false)
const addCarLoading = ref(false)
const qr = ref(null)

const stopWatchGoodId = watch(
  goodId,
  async (newId) => {
    if (!newId) {
      router.push({
        path: '/recommend',
      })
      return
    }

    loading.value = LoadStatus.LOADING
    const result = await requestGoodDetail(newId, loginStatus.value)
    if (result.code === ResponseCode.SUCCESS) {
      goodDetail.value = result.data.goodDetail
      hasCollected.value = result.data.hasCollected
      shoppingCarCount.value = result.data.shoppingCarCount
      comments.value = result.data.goodDetail.comments
      goodType.value = result.data.goodDetail.type
      loading.value = LoadStatus.SUCCESS
    } else {
      loading.value = LoadStatus.ERROR
      Notify(result.msg)
    }
  },
  { immediate: true },
)
onBeforeRouteLeave(() => {
  stopWatchGoodId()
})

// 推荐
const {
  goods: recommendGoods,
  loadingMore,
  loadingError,
  finished,
} = useGoodList({
  requestFunc: requestGoodList,
  type: goodType,
})
// 底部
const handleCollect = async () => {
  if (collecting) {
    return
  }
  collecting = true
  const result = await requestCollect(goodId.value, !hasCollected.value)
  if (result.code === ResponseCode.SUCCESS) {
    hasCollected.value = result.data
    Notify({
      type: 'success',
      message: hasCollected.value ? '收藏成功' : '取消收藏',
    })
  } else {
    Notify(result.msg)
  }
  collecting = false
}
let actionType = ''
const handleAddCar = async (count) => {
  addCarLoading.value = true
  const result = await requestAddShopCar(goodId.value, count)
  if (result.code === ResponseCode.SUCCESS) {
    shoppingCarCount.value += count
    addGoodBarVisible.value = false
  } else {
    Notify(result.msg)
  }
  addCarLoading.value = false
}
const handleBuy = (count) => {
  const formatData = {
    goodId: goodId.value,
    count,
    goodDetail: {
      imgURL: goodDetail.value.goodImg,
      title: goodDetail.value.title,
      price: goodDetail.value.price,
      type: goodDetail.value.type,
      goodType: goodDetail.value.goodType,
    },
  }
  store.commit(`orderModule/${UPDATE_FIELD}`, { selectedGoods: [formatData] })

  router.push({ name: RouteName.CONFIRM_ORDER })
}
const handleActionBarSubmit = (count) => {
  if (actionType === ClickType.ADD_SHOPINGCAR) {
    handleAddCar(count)
  }
  if (actionType === ClickType.BUY) {
    handleBuy(count)
  }
}
const handleClickActionBar = async (type) => {
  if (!loginStatus.value) {
    Notify({
      type: 'success',
      message: '请先登录',
    })
    router.push('/login')
    return
  }
  actionType = type
  switch (type) {
    case ClickType.COLLECT:
      handleCollect()
      break
    case ClickType.SHOPINGCAR:
      router.push('/recommend')
      break
    case ClickType.ADD_SHOPINGCAR:
    case ClickType.BUY:
      addGoodBarVisible.value = true
      break
    default:
  }
}

const toComment = () => {
  router.push({
    name: RouteName.COMMENT,
    query: {
      id: goodId.value,
    },
  })
}
// 导航
function navigation(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}
// 图片预览
const previewImg = (index, type) => {
  ImagePreview({
    images: goodDetail.value[type === 'swipe' ? 'goodSwiperImgs' : 'goodInfoImgs'],
    startPosition: index,
  })
}
// 分享
const showShare = ref(false)
const options = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
]
const onSelect = (option) => {
  if (option.name === '二维码') {
    const url = qr.value.getElementsByTagName('canvas')[0].toDataURL('image/png')
    const aDom = document.createElement('a')
    aDom.download = 'haha' // 设置下载的文件名
    aDom.href = url
    aDom.click()
    aDom.remove()
    Toast('二维码已保存到相册')
    return
  }
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', window.location.href)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  document.body.removeChild(input)
  Toast('已经复制链接，快去分享吧')
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
  background: rgb(247, 247, 247);
}
.van-swipe-item {
  img {
    width: 100%;
  }
}

.good_detail {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: rgb(242, 242, 242);
  .recommend {
    border-top: 1px solid rgba(0, 0, 0, 0.096);
    border-radius: 12px;
    margin-top: 15px;
    background-color: rgb(242, 242, 242);
  }
  .images_wrapper {
    width: 100%;
    img {
      width: 100%;
    }
    .title {
      text-align: center;
      line-height: 30px;
    }
  }

  .title_wrapper {
    border-radius: 0 0 15px 15px;
    background-color: rgb(255, 255, 255);
    padding-bottom: 10px;
  }
  > .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #f7f8fa;
    > .header {
      width: 100%;
      height: 45px;
      flex-shrink: 0;
      display: flex;
      overflow: hidden;
      background-color: rgb(255, 255, 255);
      .back {
        width: 40px;
        height: 44px;
        margin-right: 25px;
        span {
          display: block;
          margin: 12px 0 0 10px;
          width: 20px;
          height: 20px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==)
            no-repeat 50%;
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
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAMCAYAAAG2I8urAAAAAXNSR0IArs4c6QAAAddJREFUSA3VVr1OwzAQto0oqgQPABszD4BY4TVIfwR0aBgQb8ALIAbSoVD1J7wGrFRiAokVsbGwMSAVCXPn4PSSxklMGol6SM539913/jnbjEFzGu0j/GOTUvJACr5Owx0L5SBZVxtqDffbqbel7gNqG6K441ABglN3PyJ9YBHKk2qZXNVdzcJVJAwJzR92IvmgjlLH7RSrBhNPAwPohs508FqPf5wIjQVhOtg0xrgNA1GsQIW5yZ7ZFrVwTA+XIaLm/M4feHsRXUKnDOzSy+s7Lnclxrf59PhwFtPNdMvACn/orTGYEcpWXals0L5JLgOrtnGwx/k54+x51L/c4ZxPq8iUza9+3liss1vY57uUdzTwRJ6kysDi6RBJBhOrNY/vaYJGuQRscrlKtmVMIstQEJucEJenWbxGe0GsmKkodQZ1royExFAGVlVZq3Wy/jn5uknaT4ofkqxWlve73Ys3kk9hcRF4oerhtieXeeqoOWv5g3yrmRoHjIvCC6cQnM95m41vVkybWDa+c+YVeHllxQztNr4hyCDYxLLxNdCFaptY4CvwZo8/PcJgVIBzSPlSXQF5UXjDF716iTbdQ8b4AZxJwb2qZlv2Rn3vOs9L5C/z9d95fwDELzC7i+rQHQAAAABJRU5ErkJggg==)
            no-repeat 50%;
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
    .good_detail_actionBar {
      height: 50px;
    }
    .main-content {
      flex: 1;
      overflow: auto;
      > .card-wrapper {
        margin: 0 12px;
        margin-top: 12px;
        padding: 16px;
      }
      #scrollGood_detail {
        :deep(.title) {
          margin-bottom: 0;
        }
        .content {
          line-height: 20px;
          font-size: 12px;
          .name {
            font-weight: 700;
            line-height: 21px;
            font-size: 16px;
          }
          .price {
            font-size: 16px;
            line-height: 30px;
            color: #f2270c;
            display: inline-block;
          }
          em {
            font-size: 30px;
            font-style: normal;
          }
          .price_decimals {
            font-size: 18px;
          }
        }
      }
      #scrollComment {
        .header {
          display: flex;
          align-items: center;
          .left {
            margin-right: auto;
            font-weight: 700;
          }
          .right {
            margin-left: auto;
            font-weight: 400;
            line-height: 20px;
            font-size: 12px;
            color: #999;
          }
        }
        .comment-item + .comment-item {
          margin-top: 12px;
        }
      }
      #scrollDetail {
        .param {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin: 0 auto;
          border-top: 1px solid rgba(0, 0, 0, 0.123);
          border-left: 1px solid rgba(0, 0, 0, 0.123);
          border-radius: 5px;
          li {
            display: flex;
            width: 100%;
            .left {
              width: 35%;
              height: 30px;
              line-height: 30px;
              background-color: rgb(242, 242, 242);
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
      #scrollRecommend {
        .title {
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
