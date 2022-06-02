<template>
  <div class="my-container">
    <div class="user-head" @click="toUser">
      <div class="avatar">
        <img :src="defaultAvatar" />
      </div>
      <div class="uname">haha</div>
    </div>
    <div class="order-state" @click="toOrderDetail">
      <div v-for="(item, index) in orderStates" :key="index" class="item">
        <van-icon class="icon" :name="item.icon" />
        <div class="name">{{ item.label }}</div>
      </div>
    </div>
    <div class="menu-list">
      <div v-for="(item, index) in menuList" :key="index" class="item" @click="toPath(item.to)">
        <van-icon class="icon" :name="item.icon" />
        <span class="tit">{{ item.title }}</span>
        <span class="arrow-right"><van-icon name="arrow" /></span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Icon as vanIcon } from 'vant'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import defaultAvatar from '../assets/images/1.png'
// const store = useStore()
const router = useRouter()
const orderStates = ref([
  { label: '全部', icon: 'records' },
  { label: '待付款', icon: 'balance-pay' },
  { label: '待发货', icon: 'logistics' },
  { label: '待收货', icon: 'peer-pay' },
  { label: '待评价', icon: 'flower-o' },
])
const menuList = ref([
  { title: '收货地址', icon: 'location-o', to: '/address' },
  { title: '我的收藏', icon: 'star-o', to: '/collection' },
  { title: '我的优惠卷', icon: 'setting-o', to: '/coupon' },
  { title: '设置', icon: 'setting-o', to: '/setting' },
])

const toPath = (path) => {
  router.push({
    path,
  })
}
const toOrderDetail = () => {
  router.push({
    path: '/orderdetail',
  })
}
</script>

<style scoped lang="scss">
.my-container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background-color: rgb(246, 246, 246);
}
.user-head {
  padding: 37px 15px 57px 15px;
  background: rgb(0, 175, 236);
  color: #fff;
  .avatar {
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .uname {
    display: inline-block;
    margin-left: 11px;
    font-size: 15px;
  }
}
.order-state {
  padding: 15px;
  margin: 15px;
  margin-top: -14px;
  background: #fff;
  display: flex;
  border-radius: 3px;
  .item {
    flex: 1;
    text-align: center;
    color: #666;
    .icon {
      font-size: 26px;
      margin-bottom: 7.5px;
    }
  }
}
.menu-list {
  margin: 15px;
  .item {
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: relative;
    color: #666;
    font-size: 14px;
    &:first-child {
      border-radius: 3px 3px 0 0;
    }
    &:last-child {
      border-radius: 0 0 3px 3px;
      border-bottom: 0;
    }
    &:active {
      background: #fafafa;
    }
    .arrow-right {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.5;
    }
    .icon {
      margin-right: 8px;
      vertical-align: middle;
    }
  }
}
</style>
