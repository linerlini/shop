<template>
  <div class="page-wrapper">
    <div class="user-head" @click="toUser">
      <VAvatar :src="userInfo.avatar" class="avatar">{{ isLogin ? userInfo.name[0] : '游' }}</VAvatar>
      <div class="user-info">
        <div class="name">{{ userInfo.name }}</div>
        <div class="desc">{{ userInfo.desc }}</div>
      </div>
      <div class="setting" @click="settingPopUpVisible = true"><Icon name="setting-o" size="24"></Icon></div>
    </div>
    <Grid :column-num="orderPages.length">
      <GridItem v-for="item in orderPages" :key="item.label" :text="item.label" :icon="item.icon" :to="item.to"></GridItem>
    </Grid>
    <div class="menu-list">
      <Grid :column-num="3">
        <GridItem :text="`${userInfo.integration}`" icon="gold-coin-o"></GridItem>
        <GridItem v-for="item in menuList" :key="item.title" :text="item.title" :icon="item.icon" :to="item.to"></GridItem>
      </Grid>
    </div>
    <ActionSheet
      v-model:show="settingPopUpVisible"
      :cancel-text="settingPopupButtonText"
      title="设置"
      round
      close-on-popstate
      teleport="body"
      :closeable="false"
      close-on-click-action
      @cancel="handleClickPopupButton"
    >
      <Cell size="large" title="我的收获地址" icon="location-o" to="/address"></Cell>
      <Cell size="large" title="修改个人资料" icon="user-o" to="/edit"></Cell>
    </ActionSheet>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { Grid, GridItem, ActionSheet, Cell, Icon } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { RouteName } from 'router/'
import { LOG_OUT } from 'store/actions'
import { OrderStatus } from 'config/constants'
import VAvatar from './children/VAvatar'

const store = useStore()
const router = useRouter()

const orderPages = [
  { label: '待付款', icon: 'balance-pay', to: { name: RouteName.ORDER_LIST, query: { type: OrderStatus.FOR_PAYMENT } } },
  { label: '待发货', icon: 'logistics', to: { name: RouteName.ORDER_LIST }, query: { type: OrderStatus.WAITDELIVER } },
  { label: '待收货', icon: 'peer-pay', to: { name: RouteName.ORDER_LIST }, query: { type: OrderStatus.FOR_GOODS } },
  { label: '待评价', icon: 'flower-o', to: { name: RouteName.ORDER_LIST }, query: { type: OrderStatus.TO_EVALUATE } },
  { label: '退款', icon: 'refund-o', to: { name: RouteName.ORDER_LIST }, query: { type: 'refund' } },
]
const menuList = [
  { title: '收藏', icon: 'star-o', to: { name: RouteName.COLLECTION } },
  { title: '优惠卷', icon: 'coupon-o', to: { name: RouteName.COUPON } },
]

const isLogin = computed(() => store.state.isLogin)
const userInfo = computed(() => store.state.userModule)

const settingPopUpVisible = ref(false)
const settingPopupButtonText = computed(() => (isLogin.value ? '退出登录' : '登录'))
async function handleClickPopupButton() {
  if (isLogin.value) {
    await store.dispatch(LOG_OUT)
  }
  router.replace({ name: RouteName.LOGIN })
}

const toOrderDetail = () => {
  router.push({
    path: '/orderdetail',
  })
}
</script>

<style scoped lang="scss">
.page-wrapper {
  background-color: rgb(246, 246, 246);
  height: 100vh;
}
.user-head {
  padding: 37px 15px 57px 15px;
  background: rgb(0, 175, 236);
  color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  .setting {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .user-info {
    margin-left: 11px;
    font-size: 16px;
    .name {
      margin-bottom: 8px;
    }
    .desc {
      font-size: 12px;
    }
  }
}
.order-state {
  padding: 15px;
  margin: 15px;
  margin-top: -14px;
  background: #fff;
  display: flex;
  border-radius: 3px;
  position: relative;
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
