<template>
  <div class="orderdetail">
    <van-nav-bar title="我的订单" left-arrow @click="back" />
    <div class="tab">
      <van-tabs v-model:active="active">
        <van-tab name="0" title="全部">
          <div class="allOrder" v-if="orders.length">
            <van-card v-for="(item, index) in orders" :key="index" :num="item.num" :price="item.price" :desc="item.title" :thumb="item.img" />
          </div>
        </van-tab>
        <van-tab name="1" title="待付款">
          <div class="haha" v-if="currentOrders.length">
            <van-card v-for="(item, index) in currentOrders" :key="index" :num="item.num" :price="item.price" :desc="item.title" :thumb="item.img">
              <template #footer>
                <van-button round plain color="#00AFEC" @click="del(item)" size="mini">取消订单</van-button>
                <van-button round plain color="#00AFEC" size="mini" @click="upadte(item)">立即付款</van-button>
              </template>
            </van-card>
          </div>
        </van-tab>
        <van-tab name="2" title="待发货">
          <div class="haha" v-if="currentOrders.length">
            <van-card v-for="(item, index) in currentOrders" :key="index" :num="item.num" :price="item.price" :desc="item.title" :thumb="item.img">
              <template #footer>
                <van-button round plain color="#00AFEC" size="mini" @click="del(item)">申请退款</van-button>
              </template>
            </van-card>
          </div>
        </van-tab>
        <van-tab name="3" title="待收货">
          <div class="haha" v-if="currentOrders.length">
            <van-card v-for="(item, index) in currentOrders" :key="index" :num="item.num" :price="item.price" :desc="item.title" :thumb="item.img">
              <template #footer>
                <van-button round plain color="#00AFEC" size="mini" @click="del(item)">申请退款</van-button>
                <van-button round plain color="#00AFEC" size="mini" @click="upadte(item)">确认收货</van-button>
              </template>
            </van-card>
          </div>
        </van-tab>
        <van-tab name="4" title="待评价">
          <div class="haha" v-if="currentOrders.length">
            <van-card v-for="(item, index) in currentOrders" :key="index" :num="item.num" :price="item.price" :desc="item.title" :thumb="item.img">
              <template #footer>
                <van-button round plain color="#00AFEC" size="mini">立即评价</van-button>
              </template>
            </van-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup>
import { NavBar as vanNavBar, Tab as vanTab, Tabs as vanTabs, Card as vanCard, Button as vanButton } from 'vant'
// import { computed } from 'vue'
import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import { getOrders, delOrder, upadteOrder } from '../../server/order'
import { ref, onMounted, computed } from 'vue'

// const store = useStore()
const router = useRouter()
const orders = ref([])
const active = ref('0')
const currentOrders = computed(() => {
  return orders.value.filter((e) => e.status === active.value - 1)
})
onMounted(async () => {
  orders.value = await getOrders()
})
const back = () => {
  router.go(-1)
}

const del = async (item) => {
  await delOrder(item)
  orders.value = await getOrders()
}
const upadte = async (item) => {
  await upadteOrder(item)
  orders.value = await getOrders()
}
</script>
<style lang="scss" scoped>
.van-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.orderdetail {
  width: 100%;
  min-height: 100%;
  z-index: 2000;
  position: absolute;
  background-color: #f4f4f4;
}
</style>
