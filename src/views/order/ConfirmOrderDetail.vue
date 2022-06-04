<template>
  <div class="confirm-page">
    <div class="content">
      <AddressBar v-bind="address" @click="handleClickAddress"></AddressBar>
      <OrderDetailCard>
        <template #title>商品列表</template>
        <div class="card-list">
          <Card
            v-for="good in goods"
            :key="good.goodId"
            :thumb="good.goodDetail.imgURL"
            :title="good.goodDetail.title"
            :num="good.count"
            :price="good.goodDetail.price"
            @click-thumb="handleClickCard(good.goodId)"
          >
            <template #tags>
              <Tag plain type="danger">
                {{ good.goodDetail.type }}
              </Tag>
              <Tag plain type="danger">
                {{ good.goodDetail.goodType }}
              </Tag>
            </template>
          </Card>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>支付明细</template>
        <div class="cell-list">
          <Cell title="合计" :value="totalGoodPrice"></Cell>
          <Cell title="优惠卷" arrow-direction :value="discountAmount ? `-${discountAmount}元` : '未使用'" is-link @click="couponListVisible = true"></Cell>
          <Cell title="实付" :value="finalAmount"></Cell>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>支付方式</template>
        <div class="methods">
          <RadioGroup v-model="payMethod">
            <Cell title="零钱" size="large" icon="wechat-pay">
              <template #right-icon><Radio name="1"></Radio></template>
            </Cell>
            <Cell title="微信" size="large" icon="wechat-pay">
              <template #right-icon><Radio name="2" disabled></Radio></template>
            </Cell>
            <Cell title="支付宝" size="large" icon="wechat-pay">
              <template #right-icon><Radio name="3" disabled></Radio></template>
            </Cell>
          </RadioGroup>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>商家留言</template>
        <div class="methods">
          <Field v-model="leaveMessage" label="留言"></Field>
        </div>
      </OrderDetailCard>
    </div>
    <SubmitBar :loading="submitLoading" :disabled="!address" :price="finalAmount * 100" class="submit-bar" button-text="提交订单" @submit="handleSubmitOrder"></SubmitBar>
    <CouponList
      :visible="couponListVisible"
      :coupons="couponList.availableCoupons"
      :disabled-coupons="couponList.disabledCoupons"
      @close="handleCloseCouponList"
      @change="handleCouponSelected"
    ></CouponList>
  </div>
</template>

<script setup>
import { RouteName } from 'router/'
import { UPDATE_FIELD } from 'store/modules/address'
import { sub, add } from 'utils/'
import { SubmitBar, Card, Cell, Radio, RadioGroup, Tag, Field, Notify } from 'vant'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { requestCreateOrder } from 'server/order'
import { OrderStatus, PayMethod, ResponseCode } from 'config/constants'
import { USE } from 'store/modules/coupon'
import { CHANGE_MOENY } from 'store/modules/user'
import AddressBar from './children/AddressBar'
import OrderDetailCard from './children/OrderDetailCard'
import CouponList from './children/CouponList'

const router = useRouter()
const store = useStore()

const address = computed(() => store.getters['addressModule/selectedAddressInfo'])
function handleClickAddress() {
  const { uuid = '' } = address.value || {}
  store.commit(`addressModule/${UPDATE_FIELD}`, { isChoosingAddress: true, selectedAddressID: uuid })
  router.push({ name: RouteName.ADDRESS_LIST })
}

const goods = computed(() => store.state.orderModule.selectedGoods)
function handleClickCard(id) {
  router.push({
    name: RouteName.GOOD,
    params: {
      id,
    },
  })
}
const totalGoodPrice = computed(() => {
  return goods.value.reduce((sum, item) => {
    const {
      count,
      goodDetail: { price },
    } = item
    const totalPrice = price * count
    return add(sum, totalPrice)
  }, 0)
})

const couponList = computed(() => {
  const allAvailableCoupons = store.state.couponModule.availableCoupons
  const goodPrice = totalGoodPrice.value
  const availableCoupons = []
  const disabledCoupons = []
  allAvailableCoupons.forEach((item) => {
    if (item.condition > goodPrice) {
      disabledCoupons.push({ ...item, reason: '金额尚未达到使用标准' })
    } else {
      availableCoupons.push(item)
    }
  })
  return {
    availableCoupons,
    disabledCoupons,
  }
})
const coupon = ref(null)
let couponId = ''
const couponListVisible = ref(false)
function handleCouponSelected(id) {
  const target = couponList.value.availableCoupons.find((item) => item.uuid === id)
  couponId = id
  coupon.value = target
}
function handleCloseCouponList() {
  couponListVisible.value = false
}

const discountAmount = computed(() => {
  let amount = 0
  if (coupon.value) {
    const { unitDesc, value } = coupon.value
    switch (unitDesc) {
      case '折':
        amount = sub(totalGoodPrice.value, totalGoodPrice.value * value)
        break
      case '元':
        amount = value
        break
      default:
    }
  }
  return amount
})
const finalAmount = computed(() => {
  return sub(totalGoodPrice.value, discountAmount.value)
})

const payMethod = ref(PayMethod.INTEGRAL)

const leaveMessage = ref('')

const submitLoading = ref(false)
let hasCreated = false
async function handleSubmitOrder() {
  const { integration } = store.state.userModule
  if (hasCreated && finalAmount.value > integration) {
    Notify('余额不足')
    return
  }
  submitLoading.value = true
  const shoppingCarIds = []
  const formatGoods = []
  goods.value.forEach((item) => {
    formatGoods.push({
      count: item.count,
      price: item.goodDetail.price,
      goodId: item.goodId,
    })
    // 是否来自购物车
    if (item.uuid) {
      shoppingCarIds.push(item.uuid)
    }
  })
  const result = await requestCreateOrder({
    total: finalAmount.value,
    status: finalAmount.value > integration ? OrderStatus.FOR_PAYMENT : OrderStatus.WAITDELIVER,
    leaveMessage: leaveMessage.value,
    payMethod: PayMethod.INTEGRAL,
    name: address.value.name,
    addressDetail: address.value.addressDetail,
    tel: address.value.tel,
    couponId,
    goods: formatGoods,
    shoppingCarIds,
  })
  if (result.code === ResponseCode.SUCCESS) {
    hasCreated = true
    if (couponId) {
      store.commit(`couponModule/${USE}`, couponId)
    }
    if (finalAmount.value > integration) {
      Notify('余额不足')
    } else {
      Notify('付款成功')
      store.commit(`addressModule/${UPDATE_FIELD}`, { selectedAddressID: '' })
      store.commit(`userModule/${CHANGE_MOENY}`, { spend: finalAmount.value * -1 })
      router.replace({
        name: RouteName.ORDER_WAIT_SEND,
        query: {
          id: result.data.uuid,
        },
      })
    }
  } else {
    Notify(result.msg)
  }
  submitLoading.value = false
}
</script>
<style lang="scss" scoped>
.confirm-page {
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
  height: 100%;
  overflow: hidden;
  .content {
    flex: 1;
    overflow: auto;
    padding: 12px;
    > div {
      margin-bottom: 20px;
    }
  }
  .submit-bar {
    flex: 0;
    position: static !important;
  }
}
</style>
