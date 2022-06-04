<template>
  <VFlow :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @load-more="handleLoadMore">
    <div class="flow-wrapper" @click="handleClickCard">
      <GoodCard v-for="item in props.goods" :key="item.uuid" v-bind="item" @add="handleAdd"></GoodCard>
    </div>
  </VFlow>
  <AddGoodBar v-model:visible="addGoodBarVisible" :loading="addCarLoading" @submit="handleAddCar"></AddGoodBar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Notify, Toast } from 'vant'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import GoodCard from 'components/good_card/GoodCard'
import AddGoodBar from 'components/add_to_car_bar/AddGoodBar'
import { requestAddShopCar } from 'server/shopping_car'
import { ResponseCode } from 'config/constants'
import VFlow from './VFlow'

const router = useRouter()
const store = useStore()
const props = defineProps({
  goods: {
    type: Array,
    default() {
      return []
    },
  },
  finished: {
    type: Boolean,
    default: false,
  },
  loadingMore: {
    type: Boolean,
    default: false,
  },
  loadingError: {
    type: Object,
    default() {
      return {
        error: false,
        msg: '',
      }
    },
  },
  refreshing: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['loadMore', 'refresh'])

function handleLoadMore() {
  emit('loadMore')
}
function handleClickCard(event) {
  const target = event.target.closest('.card-wrapper')
  if (!target) {
    return
  }
  const { id } = target.dataset
  router.push(`/good/${id}`)
}

const addGoodBarVisible = ref(false)
const addCarLoading = ref(false)
let selectedGoodId = ''
const isLogin = computed(() => store.state.isLogin)
function handleAdd(uuid) {
  if (isLogin.value) {
    selectedGoodId = uuid
    addGoodBarVisible.value = true
  } else {
    Notify('请先登录')
  }
}
const handleAddCar = async (count) => {
  addCarLoading.value = true
  const result = await requestAddShopCar(selectedGoodId, count)
  if (result.code === ResponseCode.SUCCESS) {
    addGoodBarVisible.value = false
    Toast.success('添加成功')
  } else {
    Toast.error(result.msg)
  }
  addCarLoading.value = false
}
</script>
<style lang="scss" scoped>
.flow-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 8px;
  width: 100%;
  background-color: rgb(246, 246, 246);
  padding: 0 12px;
}
</style>
