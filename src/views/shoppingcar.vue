<template>
  <div class="cart-container" v-if="cartList.length">
  <div class="vv">购物车 <span class="btn-del" @click="remove"><van-icon name="delete-o" /></span></div>
    <div class="cart-list">
      <div class="item" v-for="item in cartList" :key="item.id">
        <div class="button1">
          <div class="check" :class="{ active: item.isCheck }" @click="toggleCheck(item)">
          <van-icon name="success" />
        </div>
        </div>
        <div class="img">
          <img :src="item.src[0]" />
        </div>
        <div class="det">
          <div class="title">
            <div class="title1">{{ item.title }}</div>
          </div>
          <div class="second">
            <div class="price">￥{{ item.price * 1 }}</div>
            <div class="num"><van-stepper v-model="item.num"  @change="debChangeNum({num: item.num, goodId: item.id})"/></div>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar button-color="#00AFEC" :price="totalPrice * 100" button-text="提交订单" @submit="onSubmit" :disabled="!ban">
      <van-checkbox @click="clickCheck" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
  <van-empty description="购物车空空的，快去添加吧" v-if="!cartList.length" />
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Toast, Checkbox as vanCheckbox, Icon as vanIcon, Empty as vanEmpty, Stepper as vanStepper, SubmitBar as vanSubmitBar, Dialog } from 'vant'
import { useRouter } from 'vue-router'
import { getShoppingCar, delShoppingCar, altShoppingCar } from '../../server/good'
import { debounce } from '../assets/js/util'

const store = useStore()
const router = useRouter()
const cartList = ref([])
const checked = ref(false)
const ban = computed(() => {
  return cartList.value.some((e) => e.isCheck === true)
})

onMounted(async () => {
  cartList.value = await getShoppingCar()
  console.log(cartList.value)
})

const clickCheck = () => {
  if (checked.value) {
    cartList.value.forEach((e) => {
      e.isCheck = true
    })
  } else {
    cartList.value.forEach((e) => {
      e.isCheck = false
    })
  }
}

const changeNum = async (value) => {
  if (value.num !== '') {
    const toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    await altShoppingCar(value)
    toast.clear()
  }
}

const debChangeNum = debounce(changeNum, 500)

const remove = async () => {
  if (cartList.value.every((e) => !e.isCheck)) {
    Dialog.alert({
      message: '选中商品后点击可将商品移出购物车'
    }).then(() => {
      // on close
    })
    return
  }
  Dialog.confirm({
    message:
    '确定删除选中的商品吗？'
  })
    .then(async () => {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      await new Promise((resolve, reject) => {
        const delList = cartList.value.filter((e) => e.isCheck)
        const length = delList.length
        let count = 0
        delList.forEach(async (e) => {
          await delShoppingCar(e)
          count++
          if (count === length) {
            resolve()
          }
        })
      })

      cartList.value = cartList.value.filter((e) => !e.isCheck)
      toast.clear()
    })
    .catch(() => {
      // on cancel
    })
}
const toggleCheck = (data) => {
  data.isCheck = !data.isCheck
  if (cartList.value.every((e) => e.isCheck === true)) {
    checked.value = true
  }
  if (cartList.value.every((e) => e.isCheck === false)) {
    checked.value = false
  }
  if (cartList.value.some((e) => e.isCheck === false)) {
    checked.value = false
  }
}

const totalPrice = computed(() => {
  return cartList.value.filter((a) => a.isCheck).reduce((next, cur) => next + cur.price * cur.num, 0)
})

const onSubmit = () => {
  const arr = cartList.value.filter((e) => e.isCheck)
  store.commit('setOrders', arr)
  router.push({
    path: '/order'
  })
}

</script>
<style scoped lang="scss">
.vv {
  width: 100%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  color: #666666;
  .btn-del {
            position: absolute;
            right: 15px;
            top: 0;
          }
}
.van-submit-bar {
  bottom: 50px;
}
.cart-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--van-overlay-z-index);
  width: 100%;
  height: calc(100% - 50px);
  padding-bottom: 50px;
  background-color: #F6F6F6;
  .cart-list {
    .item {
      position: relative;
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 15px 15px 15px 0px;
      background: #fff;
      .det {
        width: 65%;
        position: relative;
        .title {
          position: relative;
          margin-left: 10px;
          .title1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 4px;
            font-size: 15px;
            width: 85%;
          }
        }
        .second {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
          overflow: hidden;
          width: 100%;
          height: 25px;
          .price {
            margin-left: 10px;
            float: left;
            font-size: 15px;
            color: rgb(250, 43, 26);
          }
          .num {
            position: absolute;
            right:0;
            margin-right: 10px;
          }
        }
      }
      .img {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          aspect-ratio: 1;
        }
      }
      .button1 {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .check {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid #00AFEC;
          i {
            color: white;
          }
          &.active {
            background: #00AFEC;
          }
        }
      }
    }
  }
}
</style>
