<template>
  <div v-if="cartList.length" class="cart-container">
    <div class="vv">
      购物车 <span class="btn-del" @click="handleRemoveCarItem"><van-icon name="delete-o" /></span>
    </div>
    <div class="cart-list">
      <div v-for="item in cartList" :key="item.uuid" class="item">
        <div class="button1">
          <div class="check" :class="{ active: selectedList[item.uuid] }" @click="handleSelectCarItem(item.uuid)">
            <van-icon name="success" />
          </div>
        </div>
        <div class="img">
          <img :src="item.goodDetail.imgURL" />
        </div>
        <div class="det">
          <div class="title">
            <div class="title1">{{ item.goodDetail.title }}</div>
          </div>
          <div class="second">
            <div class="price">￥{{ item.goodDetail.price }}</div>
            <div class="num"><van-stepper :model-value="item.count" :before-change="handleBeforeStepperChange(item.uuid)" @change="handleUpdateGoodCount(item.uuid, $event)" /></div>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar button-color="#00AFEC" :price="totalPrice * 100" button-text="提交订单" @submit="handleSubmitOrder">
      <van-checkbox :model-value="hasSelecedAll" @click="handleSelectAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
  <van-empty v-if="!cartList.length" description="购物车空空的，快去添加吧" />
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Checkbox as vanCheckbox, Icon as vanIcon, Empty as vanEmpty, Stepper as vanStepper, SubmitBar as vanSubmitBar, Notify } from 'vant'
import { useRouter } from 'vue-router'
import { requestShoppingCar, requestUpdateShopCarCount, requestRemoveGoodFromCar } from 'server/shopping_car'
import { ResponseCode } from 'config/constants'
import { UPDATE_FIELD } from 'store/modules/order'
import { RouteName } from 'router/'
import { add } from '../utils/index'

const store = useStore()
const router = useRouter()

const cartList = ref([])

// 选择商品
const selectedList = ref({})
const handleSelectCarItem = (id) => {
  selectedList.value[id] = !selectedList.value[id]
}
const hasSelecedAll = computed(() => {
  return cartList.value.length === Object.values(selectedList.value).reduce((count, item) => count + Number(item), 0)
})
const handleSelectAll = () => {
  if (hasSelecedAll.value) {
    selectedList.value = cartList.value.reduce((result, item) => {
      result[item.uuid] = false
      return result
    }, {})
  } else {
    selectedList.value = cartList.value.reduce((result, item) => {
      result[item.uuid] = true
      return result
    }, {})
  }
}

// 更改商品数量
const stepperLoadingMap = ref({})
async function handleUpdateGoodCount(id, value) {
  if (stepperLoadingMap.value[id]) {
    return
  }
  stepperLoadingMap.value[id] = true
  const result = await requestUpdateShopCarCount(id, value)
  if (result.code === ResponseCode.SUCCESS) {
    const target = cartList.value.find((item) => item.uuid === id)
    target.count = value
  } else {
    Notify(result.msg)
  }
  stepperLoadingMap.value[id] = false
}
function handleBeforeStepperChange(id) {
  if (stepperLoadingMap.value[id]) {
    return true
  }
  return false
}

// 删除商品
async function handleRemoveCarItem() {
  const selectedIds = Object.entries(selectedList.value)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => value)
    .map((item) => item[0])
  const result = await requestRemoveGoodFromCar(selectedIds)
  if (result.code === ResponseCode.SUCCESS) {
    const newCardList = cartList.value.filter((item) => !selectedIds.includes(item.uuid))
    cartList.value = newCardList
    selectedList.value = []
  } else {
    Notify(result.msg)
  }
}

const totalPrice = computed(() => {
  return cartList.value.reduce((sum, item) => {
    const { uuid } = item
    if (selectedList.value[uuid]) {
      return add(sum, item.count * item.goodDetail.price)
    }
    return sum
  }, 0)
})

const handleSubmitOrder = () => {
  const selectedArr = []
  cartList.value.forEach((item) => {
    const { uuid } = item
    if (selectedList.value[uuid]) {
      selectedArr.push({ ...item })
    }
  })
  if (selectedArr.length === 0) {
    Notify('请先选择需要购买的商品')
    return
  }
  store.commit(`orderModule/${UPDATE_FIELD}`, { selectedGoods: selectedArr })
  router.push({ name: RouteName.CONFIRM_ORDER })
}

async function getShoppingCarData() {
  const result = await requestShoppingCar()
  if (result.code === ResponseCode.SUCCESS) {
    cartList.value = result.data
  } else {
    Notify(result.msg)
  }
}
getShoppingCarData()
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
  background-color: #f6f6f6;
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
            right: 0;
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
          border: 1px solid #00afec;
          i {
            color: white;
          }
          &.active {
            background: #00afec;
          }
        }
      }
    }
  }
}
</style>
