<template>
<div class="header">蔬菜水果分类</div>
<div class="main">
  <div class="slide">
    <van-sidebar v-model="active" @change="onChange">
      <van-sidebar-item v-for="(item,index) in list" :title="item.title" :key="index" />
    </van-sidebar>
  </div>
  <ul class="body">
    <li class="item" v-for="(item,index) in list[active].detail" :key="index" @click="toSearch(item.name)">
      <div class="img_wrap"><img :src="item.src" alt=""></div>
      <span>{{item.name}}</span>
    </li>
  </ul>
</div>
</template>
<script setup>
import { Sidebar as vanSidebar, SidebarItem as vanSidebarItem } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const toSearch = (value) => {
  store.commit('setKeyword', value)
  router.push({
    path: '/search'
  })
}
const active = ref(0)
const list = ref([
  {
    title: '水果',
    detail: [
      {
        name: '榴莲',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/141733/18/13747/12943/5fa9645dE237e231b/b805020b03063526.jpg!q70.dpg.webp'
      },
      {
        name: '荔枝',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/121505/33/17936/12672/5faa2e8cE65387691/db5502f933979dd6.jpg!q70.dpg.webp'
      },
      {
        name: '葡萄',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/136209/33/15227/13807/5fa96378Ebab880d1/53a32159c36f616c.jpg!q70.dpg.webp'
      },
      {
        name: '榴莲',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/141733/18/13747/12943/5fa9645dE237e231b/b805020b03063526.jpg!q70.dpg.webp'
      },
      {
        name: '荔枝',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/121505/33/17936/12672/5faa2e8cE65387691/db5502f933979dd6.jpg!q70.dpg.webp'
      },
      {
        name: '葡萄',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/136209/33/15227/13807/5fa96378Ebab880d1/53a32159c36f616c.jpg!q70.dpg.webp'
      }
    ]
  },
  {
    title: '蔬菜',
    detail: [
      {
        name: '榴莲',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/141733/18/13747/12943/5fa9645dE237e231b/b805020b03063526.jpg!q70.dpg.webp'
      },
      {
        name: '荔枝',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/121505/33/17936/12672/5faa2e8cE65387691/db5502f933979dd6.jpg!q70.dpg.webp'
      },
      {
        name: '葡萄',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/136209/33/15227/13807/5fa96378Ebab880d1/53a32159c36f616c.jpg!q70.dpg.webp'
      },
      {
        name: '榴莲',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/141733/18/13747/12943/5fa9645dE237e231b/b805020b03063526.jpg!q70.dpg.webp'
      },
      {
        name: '荔枝',
        src: 'https://m.360buyimg.com/babel/s200x200_jfs/t1/121505/33/17936/12672/5faa2e8cE65387691/db5502f933979dd6.jpg!q70.dpg.webp'
      }
    ]
  },
  {
    title: '水果'
  },
  {
    title: '蔬菜'
  },
  {
    title: '水果'
  },
  {
    title: '蔬菜'
  },
  {
    title: '水果'
  },
  {
    title: '蔬菜'
  }
])
const onChange = () => {

}
</script>
<style lang="scss" scoped>
.header {
      text-align: center;
      height: 44px;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // background-color: rgb(0,175,236);
      border-bottom: 1px rgb(229,229,229) solid;
}
.main {
  display: flex;
  .slide {
    width: 25%;
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    width: 75%;
    .item {
      width: 90px;
      height: 115px;
      text-align: center;
      .img_wrap {
        width: 65px;
        height: 65px;
        margin: 20px auto 12px;
        img {
        width: 100%;
        object-fit: contain;
      }
      }
      span {
        color: #666;
        font-size: 12px;
      }
    }
  }
}
.van-sidebar-item {
  line-height: 60px;
  padding: 0;
  width: 100%;
  text-align: center;
}
.van-sidebar-item--select:before {
  // display: none;
  height: 100%;
}
</style>
