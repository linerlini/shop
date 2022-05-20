<template>
 <action-bar>
  <action-bar-icon icon="chat-o" text="客服" @click="onChat" />
  <action-bar-icon icon="cart-o" text="购物车" @click="onShoppingCar" />
  <action-bar-icon icon="star" text="收藏" @click="toggleFavorite(props.good)" :color="getFavoriteIcon(props.good)"/>
  <action-bar-button type="danger" text="加入购物车" color="rgba(0,175,236,0.5)" @click="onClickButton(good)" />
  <action-bar-button color="rgba(0,175,236)" type="danger" text="立即购买"  @click="addorder"/>
</action-bar>
</template>
<script setup>
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant'
import useFavorite from './use_favorite'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { addShoppingCar } from '../../../server/good'
// import { useStore } from 'vuex'

const router = useRouter()
// const store = useStore()
const { getFavoriteIcon, toggleFavorite } = useFavorite()
const props = defineProps({
  good: Object
})
const emit = defineEmits(['clickBar'])
const onShoppingCar = () => {
  router.push({
    path: '/order'
  })
}

const addorder = () => {
  // console.log('2')
  emit('clickBar')
  // const arr = [{ ...props.good, num: 1 }]
  // console.log(arr)
  // store.commit('setOrders', arr)
  // router.push({
  //   path: '/order'
  // })
}

const onClickButton = (item) => {
  addShoppingCar(item)
}
</script>
<style lang="scss" scoped>
// .icon-favorite {
//   color: #00AFEC;
// }
// .icon-not-favorite {
//   color: white;
// }
</style>
