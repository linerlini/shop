<template>
  <div class="order-card">
    <div class="title">
      <div class="main">订单编号:{{ orderId.slice(0, 8) }}</div>
      <div class="sub">{{ subTitleMap[status] }}</div>
    </div>
    <div class="goods" @click="handleClickGood">
      <Card v-for="good in goods" :key="good.uuid" :thumb="good.goodImg" :title="good.title" :num="good.count" :price="good.price">
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
    <div class="total-price">实付款: {{ total }}</div>
    <div v-if="status === OrderStatus.FOR_PAYMENT" class="button-group">
      <Button plain round @click="handleClickSubButton">取消订单</Button>
      <Button type="danger" plain round @click="handleClickMainButton">付款</Button>
    </div>
    <div v-else-if="status === OrderStatus.WAITDELIVER" class="button-group">
      <Button plain round @click="handleClickSubButton">发起退款</Button>
      <Button type="danger" plain round @click="handleClickMainButton">提醒发货</Button>
    </div>
    <div v-else-if="status === OrderStatus.FOR_GOODS" class="button-group">
      <Button plain round @click="handleClickSubButton">发起退款</Button>
      <Button type="danger" plain round @click="handleClickMainButton">确认收货</Button>
    </div>
    <div v-else-if="status === OrderStatus.TO_EVALUATE" class="button-group">
      <Button plain round @click="handleClickSubButton">发起退款</Button>
      <Button type="danger" plain round @click="handleClickMainButton">评价</Button>
    </div>
    <div v-else-if="status === OrderStatus.REFUND_ING" class="button-group">
      <Button plain round @click="handleClickSubButton">取消退款</Button>
      <Button type="danger" plain round @click="handleClickMainButton">提醒处理</Button>
    </div>
    <div v-else-if="status === OrderStatus.REFUND_END" class="button-group">
      <Button type="danger" plain round @click="handleClickMainButton">再来一单</Button>
    </div>
    <div v-else class="button-group">
      <Button type="danger" plain round @click="handleClickMainButton">再来一单</Button>
    </div>
  </div>
</template>

<script setup>
import { OrderStatus, ResponseCode } from 'config/constants'
import { status } from 'nprogress'
import { RouteName } from 'router/'
import { requestPay, requestReceiveGood, requestSendGood } from 'server/order'
import { Card, Tag, Button, Toast, Notify } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },
  goods: {
    type: Array,
    default() {
      return []
    },
  },
})
const subTitleMap = {
  [OrderStatus.WAITDELIVER]: '等待发货',
  [OrderStatus.FOR_GOODS]: '等待收货',
  [OrderStatus.FOR_PAYMENT]: '等待买家付款',
  [OrderStatus.REFUND_ING]: '等待退款处理',
  [OrderStatus.REFUND_END]: '退款完成',
  [OrderStatus.TO_EVALUATE]: '交易成功',
  [OrderStatus.SUCCESS]: '交易成功',
}

async function handlePay() {
  Toast({
    type: 'loading',
    message: '正在付款',
    duration: 0,
  })
  const result = await requestPay(props.orderId)
  if (result.code === ResponseCode.SUCCESS) {
    Notify('付款成功')
    router.push({
      name: RouteName.ORDER_WAIT_SEND,
      query: {
        id: props.orderId,
      },
    })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
async function handleSend() {
  Toast({
    type: 'loading',
    message: '正在提醒发货',
    duration: 0,
  })
  const result = await requestSendGood(props.orderId)
  if (result.code === ResponseCode.SUCCESS) {
    Notify('发货成功')
    router.push({
      name: RouteName.ORDER_WAIT_RECEIVE,
      query: {
        id: props.orderId,
      },
    })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
async function handleReceive() {
  Toast({
    type: 'loading',
    message: '等待处理',
    duration: 0,
  })
  const result = await requestReceiveGood(props.orderId)
  if (result.code === ResponseCode.SUCCESS) {
    Notify('收货成功')
    router.push({
      name: RouteName.ORDER_WAIT_COMMENT,
      query: {
        id: props.orderId,
      },
    })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}
function handleClickMainButton() {
  switch (props.status) {
    case OrderStatus.FOR_PAYMENT:
      handlePay()
      break
    case OrderStatus.WAITDELIVER:
      handleSend()
      break
    case OrderStatus.FOR_GOODS:
      handleReceive()
      break
    default:
  }
}
function handleClickSubButton() {}

function handleClickGood() {
  router.push({ name: props.status, query: { id: props.orderId } })
}
</script>
<style lang="scss" scoped>
.order-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px 16px;
  .title {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 16px;
    .main {
      font-size: 16px;
      font-weight: 700;
      margin-right: auto;
    }
    .sub {
      font-size: 12px;
      color: #969799;
      margin-left: auto;
    }
  }
  .goods {
  }
  .total-price {
    font-size: 12px;
    font-weight: 700;
    text-align: end;
    margin-top: 16px;
  }
  .button-group {
    margin-top: 14px;
    text-align: end;
    > button {
      width: 90px;
      & + button {
        margin-left: 8px;
      }
    }
  }
}
</style>
