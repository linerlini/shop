<template>
  <div class="page-wrapper">
    <AddressEdit
      :area-list="areaList"
      show-set-default
      :is-saving="loadStatus.save"
      :is-deleting="loadStatus.delete"
      :show-delete="actionType === ActionType.EDIT"
      :address-info="initAddressInfo"
      :default-tag-text="默认"
      @save="handleSave"
      @delete="handleDelete"
    ></AddressEdit>
  </div>
</template>

<script setup>
import { AddressEdit, Notify } from 'vant'
import { areaList } from '@vant/area-data'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { requestDeleteAddress, requestEditAddress } from 'server/user'
import { ResponseCode } from 'config/constants'
import { ADD_ADDRESS, DELETE_ADDRESS, EDIT_ADDRESS } from 'store/modules/address'

const route = useRoute()
const router = useRouter()
const store = useStore()

const addressList = computed(() => store.state.addressModule.addressList)
const initAddressInfo = ref({})
const loadStatus = ref({
  save: false,
  delete: false,
})
const ActionType = {
  ADD: 'add',
  EDIT: 'edit',
}
const actionType = ref(ActionType.ADD)

async function handleSave(formData) {
  const addressId = route.params.id
  loadStatus.value.save = true
  const result = await requestEditAddress(formData, actionType.value, actionType.value === ActionType.EDIT ? route.params.id : '')
  if (result.code === ResponseCode.SUCCESS) {
    if (actionType.value === ActionType.ADD) {
      const { data } = result
      store.commit(`addressModule/${ADD_ADDRESS}`, { ...formData, uuid: data })
    } else {
      store.commit(`addressModule/${EDIT_ADDRESS}`, { id: addressId, addressData: { ...formData, uuid: addressId } })
    }
    Notify({ type: 'success', message: '保存成功!' })
    nextTick(() => router.back())
  } else {
    Notify(result.msg)
  }
  loadStatus.value.save = false
}
async function handleDelete() {
  const addressId = route.params.id
  loadStatus.value.delete = true
  const result = await requestDeleteAddress(addressId)
  if (result.code === ResponseCode.SUCCESS) {
    store.commit(`addressModule/${DELETE_ADDRESS}`, addressId)
    Notify({ type: 'success', message: '删除成功!' })
    nextTick(() => router.back())
  } else {
    Notify(result.msg)
  }
  loadStatus.value.delete = false
}
function reset() {
  initAddressInfo.value = {}
  loadStatus.value = {
    save: false,
    delete: false,
  }
}
const closeWatchRouteId = watch(
  () => route.params.id,
  (newId) => {
    if (newId !== '-1') {
      const target = addressList.value.find((item) => item.uuid === newId)
      if (target) {
        actionType.value = ActionType.EDIT
        initAddressInfo.value = target
      } else {
        actionType.value = ActionType.ADD
      }
    } else {
      reset()
    }
  },
  { immediate: true },
)
onBeforeRouteLeave(() => {
  closeWatchRouteId()
})
</script>
<style lang="scss" scoped></style>
