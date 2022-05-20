<template>
<div class="tuijian"></div>
<!-- <img class="tuijian" src="https://m.360buyimg.com/babel/jfs/t1/176630/36/28153/17659/61f35747E803eb041/9802ccf7f9a919bb.jpg!q70.dpg.webp" alt=""> -->
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
  <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    <!-- <ul class="goods">
        <li class="good" v-for=" (item,index) in lists" :key="index">
            <img :src="item.src" alt="">
            <div class="title">
                <span class="text">{{item.title}}</span>
            </div>
            <span class="price">
                <span style="font-size: 13.7322px;">￥</span><span>{{item.price}}</span>
            </span>
            <img class="icon" src="https://m.360buyimg.com/babel/s48x48_jfs/t1/126761/1/18665/5729/60af425cE207c7fdc/7605ddf95a621f6c.png.webp" alt="">
        </li>
    </ul> -->
    <Good :lists = 'goodList'></Good>
    </van-list>
</van-pull-refresh>

</template>
<script setup>
import { ref } from 'vue'
import { list as vanList, PullRefresh as vanPullRefresh } from 'vant'
import Good from '../../components/good/good'
import { getGoodList } from '../../../server/good'

const goodList = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  if (refreshing.value) {
    goodList.value = []
    refreshing.value = false
  }
  const result = await getGoodList()
  // console.log(result)
  // console.log(JSON.parse(JSON.stringify(result)))
  // console.log(result[0].src)
  // // console.log(JSON.parse(result))
  // console.log(Array.isArray(result[0].src))
  goodList.value = goodList.value.concat(result)

  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  if (goodList.value.length >= 24) {
    finished.value = true
  }
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
</script>
<style lang="scss" scoped>
.tuijian {
  width: 100%;
  height: 47px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgb(246,246,246);
  background-image: url(https://m.360buyimg.com/babel/jfs/t1/176630/36/28153/17659/61f35747E803eb041/9802ccf7f9a919bb.jpg!q70.dpg.webp);
}
.van-pull-refresh {
  padding-bottom: 50px;
}
// .goods {
//     width: 100%;
//     display: flex;
//     flex-wrap: wrap;
//     background-color: rgb(246,246,246);
//     justify-content: center;
//     // padding: 0 10px;
//     // margin-bottom: 50px;
//     .good {
//         width: 47%;
//         // flex: 1;
//         position: relative;
//         overflow: hidden;
//         // width: 175px;
//         height: 261.566px;
//         background-color: rgb(255, 255, 255);
//         border-radius: 10px;
//         margin:0px 3px 5px;
//         img {
//             position: absolute;
//             object-fit: contain;
//             background-color: rgba(225, 225, 255, 0);
//             width: 162.544px;
//             height: 142.616px;
//             left: 3.73665px;
//             top: 4.04804px;
//             border-radius: 0px;
//         }
//         .title {
//                 position: absolute;
//                 box-sizing: border-box;
//                 left: 9.34164px;
//                 top: 150.089px;
//                 border: 0px solid rgb(38, 38, 38);
//                 border-radius: 0px;
//                 background-color: rgba(255, 255, 255, 0);
//                 padding: 0px;
//                 font-size: 13.0783px;
//                 font-style: normal;
//                 font-weight: 400;
//                 text-align: left;
//                 text-decoration: none;
//                 color: rgb(38, 38, 38);
//                 width: 145.73px;
//                 .text {
//                         display: -webkit-box;
//                         overflow: hidden;
//                         word-break: break-all;
//                         white-space: normal;
//                         -webkit-box-orient: vertical;
//                         -webkit-line-clamp: 2;
//                         text-overflow: ellipsis;
//                         line-height: 1.5;
//                         color: rgb(38, 38, 38);
//                         font-size: 13.0783px;
//                         font-style: normal;
//                         font-weight: 400;
//                         text-align: left;
//                         text-decoration: none;
//                 }
//         }
//         .price {
//             position: absolute;
//             overflow: hidden;
//             color: rgb(250, 43, 26);
//             width: 93.4164px;
//             height: 27.0907px;
//             left: 9.34164px;
//             top: 202.402px;
//             font-size: 19.6174px;
//             font-style: normal;
//             font-weight: 400;
//             text-align: left;
//             text-decoration: none;
//             font-family: JDZH-Regular;
//             line-height: 27.0907px;
//         }
//         .icon {
//             position: absolute;
//             object-fit: contain;
//             background-color: rgba(225, 225, 255, 0);
//             width: 24.2883px;
//             height: 24.2883px;
//             left: 137.633px;
//             top: 225.756px;
//             border-radius: 0px;
//         }
//     }
// }
</style>
