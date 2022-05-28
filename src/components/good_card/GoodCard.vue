<template>
  <div class="card-wrapper" :data-id="props.uuid">
    <img v-lazy="props.goodImg" alt="" />
    <div class="title">
      <span class="text">{{ props.title }}</span>
    </div>
    <span class="price">
      <span style="font-size: 13.7322px">￥</span><span>{{ ~~props.price }}</span>
      <span style="font-size: 13.7322px">{{ ('.' + (props.price * 100 - 100 * ~~props.price)).padEnd(3, '0') }}</span>
    </span>
    <img :data-img="index" class="icon" src="https://m.360buyimg.com/babel/s48x48_jfs/t1/126761/1/18665/5729/60af425cE207c7fdc/7605ddf95a621f6c.png.webp" alt="" @click.stop="addIconCar(item)" />
  </div>
</template>

<script setup>
const props = defineProps({
  goodImg: {
    type: String,
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  uuid: {
    type: String,
    default: '',
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  overflow: hidden;
  height: 261.566px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
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
</style>
