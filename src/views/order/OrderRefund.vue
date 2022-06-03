<template>
  <div class="confirm-page">
    <div class="content">
      <AddressBar v-bind="address"></AddressBar>
      <OrderDetailCard>
        <template #title>商品列表</template>
        <div class="card-list">
          <Card v-for="good in goods" :key="good.uuid" :thumb="good.goodImg" :title="good.title" :num="good.count" :price="good.price" @click-thumb="handleClickCard(good.uuid)">
            <template #tags>
              <Tag plain type="danger">
                {{ good.type }}
              </Tag>
              <Tag plain type="danger">
                {{ good.goodType }}
              </Tag>
            </template>
          </Card>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>支付明细</template>
        <div class="cell-list">
          <Cell title="合计" :value="totalGoodPrice"></Cell>
          <Cell title="优惠卷" arrow-direction :value="discountAmount ? `-${discountAmount}元` : '未使用'"></Cell>
          <Cell title="支付方式" value="零钱"></Cell>
          <Cell title="实付" :value="finalAmount"></Cell>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>订单信息</template>
        <div class="methods">
          <Cell title="留言" :value="leaveMessage || '暂无'"></Cell>
          <Cell title="订单编号" :value="orderId.slice(0, 8)"></Cell>
          <Cell title="下单时间" :value="createdTime"></Cell>
        </div>
      </OrderDetailCard>
      <OrderDetailCard>
        <template #title>退款信息</template>
        <div class="methods">
          <Cell title="原因" :value="refundReason"></Cell>
        </div>
      </OrderDetailCard>
    </div>
    <div class="button-group">
      <Button v-if="route.name === RouteName.ORDER_REFUNDING" round text="取消退款" type="danger" @click="handleCancelRefund"></Button>
      <Button round :text="mainButtonText" type="primary" @click="handleClickMainButton"></Button>
    </div>
  </div>
</template>

<script setup>
import { RouteName } from 'router/'
import { sub, add, formatTime } from 'utils/'
import { Card, Cell, Tag, Notify, Toast, Button } from 'vant'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestCancelRefund, requestOrderDetail, requestRefundSucess } from 'server/order'
import { ResponseCode } from 'config/constants'
import AddressBar from './children/AddressBar'
import OrderDetailCard from './children/OrderDetailCard'

const router = useRouter()
const route = useRoute()
const orderId = computed(() => route.query.id || '')

const address = ref({})

const goods = ref([])
function handleClickCard(id) {
  router.push({
    name: RouteName.GOOD,
    params: {
      id,
    },
  })
}

const finalAmount = ref(0)
const totalGoodPrice = computed(() => {
  return goods.value.reduce((sum, item) => {
    const { price, count } = item
    const totalPrice = price * count
    return add(sum, totalPrice)
  }, 0)
})
const discountAmount = computed(() => {
  return sub(totalGoodPrice.value, finalAmount.value)
})

const leaveMessage = ref('')
const createdTime = ref('')
const refundReason = ref('')

async function handleRefundSucess() {
  Toast({
    type: 'loading',
    message: '正在处理',
    duration: 0,
  })
  const result = await requestRefundSucess(orderId.value)
  if (result.code === ResponseCode.SUCCESS) {
    Notify({ type: 'success', message: '退款成功' })
    router.replace({ name: RouteName.ORDER_REFUND_END, query: { id: orderId.value } })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
async function handleCancelRefund() {
  Toast({
    type: 'loading',
    message: '正在处理',
    duration: 0,
  })
  const result = await requestCancelRefund(orderId.value)
  if (result.code === ResponseCode.SUCCESS) {
    Notify({ type: 'success', message: '取消成功' })
    router.replace({ name: RouteName.ORDER_LIST })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
async function handleClickMainButton() {
  const { name } = route

  if (name === RouteName.ORDER_REFUNDING) {
    handleRefundSucess()
  } else {
    router.replace({
      name: RouteName.RECOMMEND,
    })
  }
}
const mainButtonText = computed(() => {
  const { name } = route
  if (name === RouteName.ORDER_REFUNDING) {
    return '提醒退款'
  }
  return '再来一单'
})

async function initData() {
  const { id } = route.query
  if (!id) {
    Notify('该订单不存在')
    router.push({ name: RouteName.RECOMMEND })
  }
  Toast({
    type: 'loading',
    message: '正在加载数据',
    duration: 0,
  })
  const result = await requestOrderDetail(id)
  if (result.code === ResponseCode.SUCCESS) {
    const { name, refundReason: reason, addressDetail, tel, leaveMessage: lm, goods: gs, total, createdAt } = result.data
    address.value = {
      addressDetail,
      name,
      tel,
    }
    leaveMessage.value = lm
    goods.value = gs
    finalAmount.value = total
    createdTime.value = formatTime(createdAt)
    refundReason.value = reason
  } else {
    Notify(result.msg)
    router.back()
  }
  Toast.clear()
}
initData()
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
  .button-group {
    flex: 0;
    text-align: end;
    padding: 8px 10px 8px 0;
    > button {
      width: 90px;
      & + button {
        margin-left: 8px;
      }
    }
  }
}
</style>
