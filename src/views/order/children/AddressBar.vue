<template>
  <div class="address-bar" @click="emit('click')">
    <div class="left">
      <div><Icon name="location" color="white" size="12"></Icon></div>
    </div>
    <div class="center">
      <p class="detail">{{ addressDetail }}</p>
      <p class="desc">
        <span>{{ name }}</span>
        <span>{{ tel }}</span>
      </p>
    </div>
    <div class="right">
      <Icon name="arrow" size="20"></Icon>
    </div>
  </div>
</template>

<script setup>
import { Icon } from 'vant'

defineProps({
  addressDetail: {
    type: String,
    default: '请选择收货地址',
  },
  name: {
    type: String,
    default: '',
  },
  tel: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['click'])
</script>
<style lang="scss" scoped>
.address-bar {
  padding: 20px 12px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  width: 100%;
  align-items: center;
  .left {
    margin-right: 8px;
    > div {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00afec;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    .detail {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
    }
    .desc {
      font-size: 12px;
      color: #333;
      span:last-child {
        color: rgba(69, 90, 100, 0.6);
      }
    }
  }
}
</style>
