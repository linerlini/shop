<template>
  <div class="address">
    <div class="list" v-if="!show">
      <van-nav-bar
        title="地址列表"
        left-arrow
        @click="back"
      />
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @select="onSelect(item,index)"
        @add="onAdd"
        @edit="onEdit(item)"
      />
    </div>
    <div class="elseList" v-if="show">
      <van-nav-bar
    title="新建地址"
    left-arrow
    @click="back1"
  />
  <div class="form">
    <van-cell-group inset>
    <van-field v-model="addname" label="姓名" placeholder="请输入姓名" />
    <van-field v-model="tel" label="联系电话" placeholder="请输入联系电话" />
    <van-field v-model="add" label="详细地址" placeholder="请输入详细地址" />
  </van-cell-group>
  </div>
  <van-button round block type="primary" native-type="submit" @click="addAdd">
      提交
  </van-button>
    </div>
  </div>
</template>
<script setup>
import { Dialog, Button as vanButton, AddressList as vanAddressList, NavBar as vanNavBar, Field as vanField, CellGroup as vanCellGroup } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { delAddress, addAddress, getAddress } from '../../server/address'
import store from '../store'
const show = ref(false)
const addname = ref('')
const tel = ref('')
const add = ref('')
const list = ref([])
const router = useRouter()
const chosenAddressId = ref('')

const onAdd = () => {
  show.value = true
}
const addAdd = async () => {
  await addAddress({
    name: addname.value,
    tel: tel.value,
    add: add.value
  })
  list.value = await getAddress()
  console.log(list.value)
  if (list.value.length) {
    chosenAddressId.value = list.value[0].id
  }
  back1()
}
const onEdit = () => {
  Dialog.confirm({
    message:
    '您确定删除该地址吗?'
  })
    .then(async () => {
      await delAddress({ id: chosenAddressId.value })
      list.value = await getAddress()
      console.log(list.value)
      if (list.value.length) {
        chosenAddressId.value = list.value[0].id
      }
    })
}

const onSelect = (a, b) => {
  setTimeout(() => {
    store.commit('setAddress', list.value.find((e) => e.id === chosenAddressId.value))
    router.go(-1)
  }, 0)
}

const back = () => {
  store.commit('setAddress', list.value.find((e) => e.id === chosenAddressId.value))
  router.go(-1)
}

const back1 = () => {
  show.value = false
}

(async () => {
  list.value = await getAddress()
  if (list.value.length) {
    if (store.state.address.id) {
      chosenAddressId.value = store.state.address.id
    } else {
      chosenAddressId.value = list.value[0].id
      store.commit('setAddress', list.value[0])
    }
  }
})()
</script>
<style lang="scss" scoped>
.address {
  width: 100%;
  min-height: 100%;
  z-index:2000;
  position: absolute;
  background-color: #F4F4F4;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
}
.elselist {
  width: 100%;
  height: 100%;
}
</style>
