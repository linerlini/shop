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
    </div>
    <div class="button-group">
      <Button round text="发起退款" type="danger" @click="refundVisible = true"></Button>
      <Button round :text="mainButtonText" type="primary" @click="handleClickMainButton"></Button>
    </div>
    <RefundForm :visible="refundVisible" :loading="refundSubmitLoading" @close="handleCloseRefund" @submit="handleRefund"></RefundForm>
  </div>
</template>

<script setup>
import { RouteName } from 'router/'
import { sub, add, formatTime } from 'utils/'
import { Card, Cell, Tag, Notify, Toast, Button } from 'vant'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestOrderDetail, requestReceiveGood, requestSendGood, requestRefund } from 'server/order'
import { ResponseCode } from 'config/constants'
import AddressBar from './children/AddressBar'
import OrderDetailCard from './children/OrderDetailCard'
import RefundForm from './children/RefundForm'

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

async function handleClickSend() {
  const result = await requestSendGood(route.query.id)
  if (result.code === ResponseCode.SUCCESS) {
    Notify({ type: 'success', message: '发货成功' })
    router.replace({
      name: RouteName.ORDER_WAIT_RECEIVE,
      query: { id: route.query.id },
    })
  } else {
    Notify(result.msg)
  }
}
async function handleClickReceive() {
  const result = await requestReceiveGood(route.query.id)
  if (result.code === ResponseCode.SUCCESS) {
    Notify({ type: 'success', message: '收货成功' })
    router.replace({
      name: RouteName.ORDER_WAIT_COMMENT,
      query: { id: route.query.id },
    })
  } else {
    Notify(result.msg)
  }
}
async function handleClickMainButton() {
  const { name } = route
  Toast({
    type: 'loading',
    message: '正在处理',
    duration: 0,
  })
  if (name === RouteName.ORDER_WAIT_SEND) {
    await handleClickSend()
  } else {
    await handleClickReceive()
  }
  Toast.clear()
}
const mainButtonText = computed(() => {
  const { name } = route
  if (name === RouteName.ORDER_WAIT_SEND) {
    return '提醒发货'
  }
  return '确认收货'
})

const refundVisible = ref(false)
const refundSubmitLoading = ref(false)
function handleCloseRefund() {
  refundVisible.value = false
}
async function handleRefund(value) {
  refundSubmitLoading.value = true
  const result = await requestRefund({
    orderId: orderId.value,
    refundMessage: value.reason,
  })
  if (result.code === ResponseCode.SUCCESS) {
    Notify({
      type: 'success',
      message: '成功发起退款',
    })
    refundSubmitLoading.value = false
    router.replace({
      name: RouteName.ORDER_REFUNDING,
      query: {
        id: orderId.value,
      },
    })
  } else {
    Notify(result.msg)
  }
  refundSubmitLoading.value = false
}

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
    const { name, addressDetail, tel, leaveMessage: lm, goods: gs, total, createdAt } = result.data
    address.value = {
      addressDetail,
      name,
      tel,
    }
    leaveMessage.value = lm
    goods.value = gs
    finalAmount.value = total
    createdTime.value = formatTime(createdAt)
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
