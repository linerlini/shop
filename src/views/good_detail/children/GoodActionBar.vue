<template>
  <action-bar>
    <action-bar-icon icon="chat-o" text="客服" />
    <action-bar-icon icon="cart-o" text="购物车" :badge="props.shoppingCount" @click="emit('clickBar', ClickType.SHOPINGCAR)" />
    <action-bar-icon icon="star" text="收藏" :color="collectIconColor" @click="emit('clickBar', ClickType.COLLECT)" />
    <action-bar-button type="danger" text="加入购物车" color="rgba(0,175,236,0.5)" @click="emit('clickBar', ClickType.ADD_SHOPINGCAR)" />
    <action-bar-button color="rgba(0,175,236)" type="danger" text="立即购买" @click="emit('clickBar', ClickType.BUY)" />
  </action-bar>
</template>
<script setup>
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant'
import { computed, defineEmits } from 'vue'

const props = defineProps({
  collected: {
    type: Boolean,
    default: false,
  },
  shoppingCount: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['clickBar'])

const collectIconColor = computed(() => {
  return props.collected ? '#00afec' : '#323233'
})
</script>
<script>
// eslint-disable-next-line import/prefer-default-export
export const ClickType = {
  SHOPINGCAR: 'shopingCar',
  COLLECT: 'collect',
  ADD_SHOPINGCAR: 'addShopingCar',
  BUY: 'buy',
}
</script>
<style lang="scss" scoped></style>
