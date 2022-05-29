<template>
  <ActionSheet :show="props.visible" @open="handleOpen" @close="handleClose">
    <div class="total">
      <div class="num">
        <div class="left">数量</div>
        <div class="right"><Stepper v-model="count"></Stepper></div>
      </div>
      <Button :loading="props.loading" type="primary" size="small" block round color="#00AFEC" @click="handleSubmit">确定</Button>
    </div>
  </ActionSheet>
</template>

<script setup>
import { ref } from 'vue'
import { ActionSheet, Button, Stepper } from 'vant'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits('submit', 'open', 'close', 'update:visible')
const count = ref(1)
const handleSubmit = () => {
  emit('submit', count.value)
}
const handleOpen = () => {
  emit('open')
  emit('update:visible', true)
}
const handleClose = () => {
  if (props.loading) {
    return
  }
  emit('close')
  emit('update:visible', false)
}
</script>
<style lang="scss" scoped>
.total {
  padding: 20px;
  .num {
    padding-bottom: 20px;
    overflow: hidden;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
}
</style>
