<template>
  <div class="confirm-page">
    <div class="content">
      <AddressBar v-bind="address" @click="handleClickAddress"></AddressBar>
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
    <SubmitBar :loading="submitLoading" :disabled="!address" :price="finalAmount * 100" class="submit-bar" button-text="付款" @submit="handleSubmitOrder"></SubmitBar>
  </div>
</template>

<script setup>
import { RouteName } from 'router/'
import { UPDATE_FIELD } from 'store/modules/address'
import { sub, add } from 'utils/'
import { SubmitBar, Card, Cell, Radio, RadioGroup, Tag, Field, Notify, Toast } from 'vant'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { requestOrderDetail, requestPay } from 'server/order'
import { PayMethod, ResponseCode } from 'config/constants'
import { CHANGE_MOENY } from 'store/modules/user'
import AddressBar from './children/AddressBar'
import OrderDetailCard from './children/OrderDetailCard'

const router = useRouter()
const route = useRoute()
const store = useStore()

const address = ref({})
watch(
  () => store.getters[`addressModule/selectedAddressInfo`],
  (value) => {
    address.value = value
  },
)
function handleClickAddress() {
  store.commit(`addressModule/${UPDATE_FIELD}`, { isChoosingAddress: true })
  router.push({ name: RouteName.ADDRESS_LIST })
}

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

const payMethod = ref(PayMethod.INTEGRAL)

const leaveMessage = ref('')

const submitLoading = ref(false)
async function handleSubmitOrder() {
  submitLoading.value = true
  const result = await requestPay(route.query.id, address.value.uuid ? address.value : null)
  if (result.code === ResponseCode.SUCCESS) {
    Notify({ type: 'success', message: '付款成功' })
    store.commit(`userModule/${CHANGE_MOENY}`, { spend: finalAmount.value * -1 })
    router.replace({
      name: RouteName.ORDER_WAIT_SEND,
      query: { id: route.query.id },
    })
  } else {
    Notify(result.msg)
  }
  submitLoading.value = false
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
    const { name, addressDetail, tel, leaveMessage: lm, goods: gs, total } = result.data
    const selectedAddress = store.getters[`addressModule/selectedAddressInfo`]
    if (selectedAddress) {
      address.value = {
        ...selectedAddress,
      }
    } else {
      address.value = {
        addressDetail,
        name,
        tel,
      }
    }

    leaveMessage.value = lm
    goods.value = gs
    finalAmount.value = total
  } else {
    Notify(result.msg)
    router.back()
  }
  Toast.clear()
}

onBeforeRouteLeave(() => {
  store.commit(`addressModule/${UPDATE_FIELD}`, { selectedAddressID: '' })
})
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
  .submit-bar {
    flex: 0;
    position: static !important;
  }
}
</style>
