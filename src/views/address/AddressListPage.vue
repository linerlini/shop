<template>
  <div class="page-wrapper">
    <AddressList
      v-if="loadStatus === LoadStatus.SUCCESS"
      :model-value="selectedAddressId"
      :list="addressList"
      @click-item="handleClickAddressItem"
      @add="handleClickAdd"
      @edit="handleClickEdit"
    ></AddressList>
    <Empty v-show="emptyStatusData.visible" :description="emptyStatusData.description"></Empty>
  </div>
</template>

<script setup>
import { LoadStatus, ResponseCode } from 'config/constants'
import { requestAddressList } from 'server/user'
import { AddressList, Empty, Toast, Notify } from 'vant'
import { computed, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { RouteName } from 'router/'
import { UPDATE_FIELD } from 'store/modules/address'

const router = useRouter()
const store = useStore()

const addressList = computed(() => store.state.addressModule.addressList)
const isChoosingAddress = computed(() => store.state.addressModule.isChoosingAddress)
const loadStatus = ref(LoadStatus.LOADING)
const emptyStatusData = computed(() => {
  if (loadStatus.value === 'error') {
    return {
      visible: true,
      description: '网络错误，请重试',
    }
  }
  if (addressList.value.length === 0 && loadStatus.value === LoadStatus.SUCCESS) {
    return {
      visible: true,
      description: '暂无数据',
    }
  }
  return {
    visible: false,
    description: '',
  }
})

const handleClickAdd = () => {
  router.push({ name: RouteName.ADDRESS_EDIT, params: { id: -1 } })
}
const handleClickEdit = (address) => {
  router.push({ name: RouteName.ADDRESS_EDIT, params: { id: address.uuid } })
}
const selectedAddressId = ref(store.state.addressModule.selectedAddressID)
const handleClickAddressItem = (address) => {
  selectedAddressId.value = address.id

  if (isChoosingAddress.value) {
    store.commit(`addressModule/${UPDATE_FIELD}`, {
      selectedAddressID: address.uuid,
    })
    nextTick(() => router.back())
  }
}
// 初始化
Toast.loading({
  message: '加载中...',
  forbidClick: true,
})
async function initData() {
  const { addressListLoadStatus } = store.state.addressModule
  if (addressListLoadStatus === LoadStatus.SUCCESS) {
    loadStatus.value = LoadStatus.SUCCESS
    Toast.clear()
    return
  }
  const result = await requestAddressList()
  if (result.code === ResponseCode.SUCCESS) {
    loadStatus.value = LoadStatus.SUCCESS
    store.commit(`addressModule/${UPDATE_FIELD}`, {
      addressList: result.data.map((item) => ({ ...item, address: item.addressDetail, id: item.uuid })),
      addressListLoadStatus: LoadStatus.SUCCESS,
    })
  } else {
    loadStatus.value = LoadStatus.ERROR
    Notify(result.msg)
    store.commit(`addressModule/${UPDATE_FIELD}`, {
      addressListLoadStatus: LoadStatus.ERROR,
    })
  }
  Toast.clear()
}
initData()

onBeforeRouteLeave(() => {
  store.commit(`addressModule/${UPDATE_FIELD}`, { isChoosingAddress: false })
})
</script>
<style lang="scss" scoped>
.page-wrapper {
}
</style>
