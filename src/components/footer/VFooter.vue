<template>
  <div class="footer">
    <router-link v-for="footer in footers" :key="footer.path" class="footer-item" :to="footer.path">
      <span class="iconfont icon" :class="footer.iconcls"></span>
      <p class="text">{{ footer.name }}</p>
    </router-link>
  </div>
</template>
<script setup>
const footers = [
  {
    path: '/recommend',
    iconcls: 'icon-zhuye',
    name: '主页',
  },
  {
    path: '/sort',
    iconcls: 'icon-fen_lei2',
    name: '分类',
  },
  {
    path: '/shoppingcar',
    iconcls: 'icon-gouwuchekong',
    name: '购物车',
  },
  {
    path: '/profile',
    iconcls: 'icon-wode',
    name: '我的',
  },
]
</script>
<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 980;
  background-color: #ffffff;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #f8f8f8;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;

  .footer-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0 0;

    .icon::before {
      font-size: 20px;
    }

    .text {
      height: 24px;
      font-size: 12px;
      text-align: center;
      color: #666666;
      line-height: 24px;
      // margin: 5px 0 0;
    }
    &.router-link-active {
      background-color: rgb(0, 175, 236, 0.8);
      // border: ;
      .text,
      .icon::before {
        font-weight: 700;
      }
    }
  }
}
</style>
