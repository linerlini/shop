<template>
      <ul class="goods">
        <li class="good" v-for=" (item,index) in props.lists" :key="index" @click="selectItem(item)">
            <img v-lazy="item.src[0]" alt="">
            <div class="title">
                <span class="text">{{item.title}}</span>
            </div>
            <span class="price">
                <span style="font-size: 13.7322px;">￥</span><span>{{~~item.price}}</span>
                <span style="font-size: 13.7322px;">{{('.'+(item.price*100-100*(~~item.price))).padEnd(3, '0')}}</span>
            </span>
            <img :data-img="index" @click.stop="addIconCar(item)" class="icon" src="https://m.360buyimg.com/babel/s48x48_jfs/t1/126761/1/18665/5729/60af425cE207c7fdc/7605ddf95a621f6c.png.webp" alt="">
        </li>
    </ul>
</template>
<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { addShoppingCar } from '../../../server/good'
import { Toast } from 'vant'

const store = useStore()
const router = useRouter()
const token = computed(() => store.state.token)
const props = defineProps({
  lists: Array
})
const selectItem = (item) => {
  router.push({
    path: `/good/${item.id}`
    // params: {
    //   id: item.id
    // }
  })
}
const addIconCar = (item) => {
  if (token.value.length !== 0) {
    addShoppingCar(item)
  } else {
    Toast({
      message: '请先登录',
      duration: 1000,
      forbidClick: true
    })
    router.push({
      path: '/login'
    })
  }
}
// const selectItem1 = (e) => {
//   if (e.target.dataset.img + 1) {
//     if (token.value.length !== 0) {
//       addShoppingCar(props.lists[e.target.dataset.img])
//     } else {
//       router.push({
//         path: '/login'
//       })
//     }
//     return
//   }
//   router.push({
//     path: `/good/${props.lists[e.target.dataset.li].id}`
//   })
// }

</script>
<style lang="scss" scoped>
.goods {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(246,246,246);
    justify-content: center;
    // padding: 0 10px;
    // margin-bottom: 50px;
    .good {
        width: 47%;
        // flex: 1;
        position: relative;
        overflow: hidden;
        // width: 175px;
        height: 261.566px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        margin:0px 3px 5px;
        img {
            position: absolute;
            object-fit: contain;
            background-color: rgba(225, 225, 255, 0);
            width: 162.544px;
            height: 142.616px;
            left: 3.73665px;
            top: 4.04804px;
            border-radius: 0px;
        }
        .title {
                position: absolute;
                box-sizing: border-box;
                left: 9.34164px;
                top: 150.089px;
                border: 0px solid rgb(38, 38, 38);
                border-radius: 0px;
                background-color: rgba(255, 255, 255, 0);
                padding: 0px;
                font-size: 13.0783px;
                font-style: normal;
                font-weight: 400;
                text-align: left;
                text-decoration: none;
                color: rgb(38, 38, 38);
                width: 145.73px;
                .text {
                        display: -webkit-box;
                        overflow: hidden;
                        word-break: break-all;
                        white-space: normal;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        text-overflow: ellipsis;
                        line-height: 1.5;
                        color: rgb(38, 38, 38);
                        font-size: 13.0783px;
                        font-style: normal;
                        font-weight: 400;
                        text-align: left;
                        text-decoration: none;
                }
        }
        .price {
            position: absolute;
            overflow: hidden;
            color: rgb(250, 43, 26);
            width: 93.4164px;
            height: 27.0907px;
            left: 9.34164px;
            top: 202.402px;
            font-size: 19.6174px;
            font-style: normal;
            font-weight: 400;
            text-align: left;
            text-decoration: none;
            font-family: JDZH-Regular;
            line-height: 27.0907px;
        }
        .icon {
            position: absolute;
            object-fit: contain;
            background-color: rgba(225, 225, 255, 0);
            width: 24.2883px;
            height: 24.2883px;
            left: 137.633px;
            top: 225.756px;
            border-radius: 0px;
        }
    }
}
</style>
