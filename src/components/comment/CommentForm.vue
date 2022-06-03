<template>
  <ActionSheet :show="visible" title="添加评价" @cancel="handleClickCloseButton">
    <Form @submit="handleComment">
      <Field name="rate" label="评分" :rules="rules.rate">
        <template #input>
          <Rate v-model="rate" :size="25" color="#ffd21e" void-icon="star" void-color="#eee"></Rate>
        </template>
      </Field>
      <Field v-model="comment" :rules="rules.comment" name="comment" label="评价" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入评价" show-word-limit> </Field>
      <Button :loading="loading" round block type="primary" native-type="submit" class="submit-button">提交</Button>
    </Form>
  </ActionSheet>
</template>

<script setup>
import { ActionSheet, Form, Field, Rate, Button } from 'vant'
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
  rate: [
    {
      required: true,
      message: '请选择评分',
    },
  ],
  comment: [
    {
      required: true,
      message: '请填写你的评价',
    },
  ],
}
const emit = defineEmits(['close', 'comment'])

function handleClickCloseButton() {
  if (props.loading) {
    return
  }
  emit('close')
}
async function handleComment(value) {
  emit('comment', value)
}
const rate = ref('')
const comment = ref('')
</script>
<style lang="scss" scoped>
.submit-button {
  margin: 16px auto;
  width: 80%;
}
</style>
