<template>
  <router-view></router-view>
  <Footer v-show="footerVisible"></Footer>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Footer from 'components/footer/VFooter'
import { RouteName } from './router'

const route = useRoute()

const footerVisible = computed(() => {
  return ![
    RouteName.ORDER_WAIT_PAY,
    RouteName.ORDER_LIST,
    RouteName.ADDRESS_EDIT,
    RouteName.ADDRESS_LIST,
    RouteName.COLLECTION,
    RouteName.COUPON,
    RouteName.EDIT_PROFILE,
    RouteName.CONFIRM_ORDER,
    RouteName.ORDER_WAIT_SEND,
    RouteName.ORDER_WAIT_RECEIVE,
    RouteName.ORDER_WAIT_COMMENT,
    RouteName.ORDER_SUCESS,
    RouteName.ORDER_REFUNDING,
    RouteName.ORDER_REFUND_END,
    RouteName.GOOD,
    RouteName.COMMENT,
  ].includes(route.name)
})
</script>
