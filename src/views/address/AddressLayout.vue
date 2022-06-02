<template>
  <div class="page-layout">
    <NavBar :title="navBarTitle" left-arrow fixed placeholder safe-area-inset-top @click-left="router.back()"></NavBar>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { NavBar } from 'vant'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { computed } from 'vue'
import { RouteName } from 'router/'

const route = useRoute()
const router = useRouter()

const navBarTitle = computed(() => {
  if (route.name === RouteName.ADDRESS_LIST) {
    return '地址列表'
  }
  return '编辑地址'
})
</script>
<style lang="scss" scoped>
.page-layout {
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
