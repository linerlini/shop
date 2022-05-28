<template>
  <div class="order">
    <van-nav-bar title="填写订单" left-arrow @click="back" />
    <div class="address-info" @click="selectAddress">
      <div class="empty" v-if="!address.id">
        <van-icon class="arrow-left" name="location-o" />
        <div class="text">请选择收获地址</div>
      </div>
      <div class="content" v-if="address.id">
        <div class="name">
          <span>{{ address.name }}</span>
          <span>{{ address.tel }}</span>
        </div>
        <div class="add">{{ address.address }}</div>
      </div>
      <van-icon class="arrow-right" name="arrow" />
    </div>

    <div class="goods">
      <div class="good" v-for="(item, index) in orders" :key="index">
        <div class="img_wrapper">
          <img :src="item.src[0]" alt="" />
        </div>
        <div class="title">
          <div class="first">{{ item.title }}</div>
          <div class="second">
            <div class="price">{{ '￥' + item.price }}</div>
            <div class="num">{{ 'x' + item.num }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="shuoming1">
      <div class="oneline">
        <div class="left">优惠券</div>
        <div class="right">无可用优惠券</div>
      </div>
      <div class="oneline">
        <div class="left">店铺优惠</div>
        <div class="right">无</div>
      </div>
    </div>
    <div class="shuoming2">
      <div class="oneline">
        <div class="left">商品金额</div>
        <div class="right">{{ '￥' + (totalPrice / 100).toFixed(2) }}</div>
      </div>
      <div class="oneline">
        <div class="left">优惠金额</div>
        <div class="right">0</div>
      </div>
      <div class="oneline">
        <div class="left">运费</div>
        <div class="right">免运费</div>
      </div>
      <van-field v-model="remark" label="备注" placeholder="请输入备注" />
    </div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" :disabled="!ban" />
  </div>
</template>
<script setup>
import { NavBar as vanNavBar, Icon as vanIcon, Field as vanField, SubmitBar as vanSubmitBar, Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { addOrder } from '../../server/order'
import { delShoppingCar } from '../../server/good'
const router = useRouter()
const store = useStore()

const ban = computed(() => store.state.address.name)
const remark = ref('')
const address = computed(() => store.state.address)
const orders = computed(() => store.state.orders)
const totalPrice = computed(() => orders.value.reduce((next, cur) => next + cur.price * cur.num, 0) * 100)

const selectAddress = () => {
  router.push({
    path: '/address',
  })
}

const onSubmit = async () => {
  const toast = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  await new Promise((resolve, reject) => {
    const { length } = orders.value
    let count = 0
    orders.value.forEach(async (e) => {
      const a = {
        price: e.price,
        num: e.num,
        img: e.src[0],
        title: e.title,
        name: address.value.name,
        tel: address.value.tel,
        address: address.value.address,
        note: remark.value,
      }
      await addOrder(a)
      await delShoppingCar(e)
      count++
      if (count === length) {
        resolve()
      }
    })
  })
  toast.clear()
  store.commit('setOrders', [])
  // router.push({
  //   path: '/shoppingcar'
  // })
  router.go(-1)
}
const back = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.van-nav-bar__left {
  color: black;
}

.order {
  width: 100%;
  min-height: 100%;
  z-index: 2000;
  // margin-bottom: 70px;
  position: absolute;
  background-color: #f4f4f4;

  .shuoming1,
  .shuoming2 {
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    margin-top: 15px;

    // margin-bottom: 70px;
    .oneline {
      padding: 15px;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      color: #666;
      font-size: 14px;

      .left {
        float: left;
      }

      .right {
        float: right;
      }
    }
  }

  .shuoming2 {
    margin-bottom: 70px;
  }

  .goods {
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    margin-top: 15px;

    .good {
      display: flex;
      width: 95%;
      margin: 0 auto;

      .img_wrapper {
        padding: 10px;
        width: 22%;

        img {
          width: 100%;
          aspect-ratio: 1;
        }
      }

      .title {
        width: 70%;
        position: relative;

        .first {
          margin-top: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #666;
        }

        .second {
          position: absolute;
          bottom: 16px;
          left: 0;
          width: 100%;
          margin-left: 5px;

          // display: flex;
          .price {
            float: left;
            font-size: 15px;
            color: rgb(250, 43, 26);
          }

          .num {
            float: right;
            right: 15px;
            color: #666;
          }
        }
      }
    }
  }

  .address-info {
    width: 100%;
    height: 68px;
    background: #fff;
    position: relative;

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: repeating-linear-gradient(-45deg, #ff6c6c, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
      content: '';
    }

    .arrow-right {
      position: absolute;
      right: 10px;
      top: 20px;
      color: #999;
    }

    .content {
      .name {
        position: absolute;
        left: 21px;
        top: 17px;
        font-size: 10px;

        span {
          display: inline-block;
          margin: 0 10px;
        }
      }

      .add {
        position: absolute;
        left: 30px;
        top: 37px;
        font-size: 16px;
      }
    }

    .empty {
      color: #999;

      .arrow-left {
        position: absolute;
        left: 20px;
        top: 25px;
        width: 19px;
        height: 19px;
      }

      .text {
        position: absolute;
        left: 40px;
        top: 25px;
        font-size: 15px;
      }
    }
  }
}
</style>
