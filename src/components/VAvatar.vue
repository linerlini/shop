<template>
  <div class="avatar-wrapper" @click="emit('click')">
    <img v-if="src" :src="src" alt="" />
    <div v-else class="name-avatar"><slot></slot></div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    default: '',
  },
})
defineEmits(['click'])
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  width: 60px;
  height: 60px;
  > * {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
  .name-avatar {
    background-color: #e7e7e7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
}
</style>
