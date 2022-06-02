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
  return ![RouteName.ORDER_LIST, RouteName.ADDRESS_EDIT, RouteName.ADDRESS_LIST, RouteName.COLLECTION, RouteName.COUPON, RouteName.EDIT_PROFILE, RouteName.CONFIRM_ORDER].includes(route.name)
})
</script>
