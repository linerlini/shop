<template>
  <ActionSheet :show="visible" title="退款申请" @cancel="handleClickCloseButton">
    <Form @submit="handleComment">
      <Field v-model="comment" :rules="rules.reason" name="reason" label="退款原因" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入您的退款原因" show-word-limit> </Field>
      <Button :loading="loading" round block type="primary" native-type="submit" class="submit-button">提交</Button>
    </Form>
  </ActionSheet>
</template>

<script setup>
import { ActionSheet, Form, Field, Button } from 'vant'
import { ref } from 'vue'

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
const rules = {
  reason: [
    {
      required: true,
      message: '请填写你的评价',
    },
  ],
}
const emit = defineEmits(['close', 'submit'])

function handleClickCloseButton() {
  if (props.loading) {
    return
  }
  emit('close')
}
async function handleComment(value) {
  emit('submit', value)
}
const comment = ref('')
</script>
<style lang="scss" scoped>
.submit-button {
  margin: 16px auto;
  width: 80%;
}
</style>
