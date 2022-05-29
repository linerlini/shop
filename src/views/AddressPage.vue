<template>
  <div class="page-wrapper">
    <AddressList></AddressList>
  </div>
</template>

<script setup>
import { AddressList } from 'vant'
import { ref } from 'vue'

const addressList = ref([])
</script>
<style lang="scss" scoped></style>
