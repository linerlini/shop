<template>
  <div class="card-wrapper">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.card-wrapper {
  background-color: white;
  border-radius: 8px;
  padding: 20px 16px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
}
</style>
