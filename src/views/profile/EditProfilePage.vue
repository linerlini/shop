<template>
  <div class="page-wrapper">
    <NavBar title="修改个人资料" left-arrow safe-area-inset-top @click-left="router.back()"></NavBar>
    <Form ref="form" class="form" @submit="handleSubmit">
      <CellGroup title="个人资料">
        <Field v-model="formData.name" :rules="rules.name" label="用户名" name="name" placeholder="请输入用户名"></Field>
        <Field v-model="formData.desc" rows="2" show-word-limit autosize maxlength="50" :rules="rules.desc" label="个人简介" name="desc" placeholder="请输入个人简介"></Field>
        <Field name="avatar" label="上传头像" :rules="rules.avatar">
          <template #input><Uploader v-model="formData.avatar" :max-count="1"></Uploader></template>
        </Field>
      </CellGroup>
    </Form>
    <div class="button-group">
      <Button type="primary" block round plain @click="handleClickSubmit">提交</Button>
      <Button type="danger" block round plain @click="router.back()">取消</Button>
    </div>
  </div>
</template>

<script setup>
import { NavBar, Form, Field, CellGroup, Button, Uploader, Toast, Notify } from 'vant'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { requestEditProfile } from 'server/user'
import { ResponseCode } from 'config/constants'
import { UPDATE_USER } from 'store/modules/user'

const store = useStore()
const router = useRouter()

const formData = ref({
  name: '',
  desc: '',
  avatar: [],
})
const form = ref(null)
const rules = {
  name: [
    {
      required: true,
      message: '必须填写用户名',
      formatter(value) {
        return value.trim()
      },
    },
  ],
  desc: [
    {
      formatter(value) {
        return value.trim()
      },
    },
  ],
  avatar: [
    {
      required: true,
      message: '请上传您的头像',
    },
  ],
}

function handleClickSubmit() {
  form.value.submit()
}
async function handleSubmit() {
  Toast({
    type: 'loading',
    message: '正在提交',
    overlay: true,
    duration: 0,
  })
  const { name, desc } = formData.value
  const data = new FormData()
  data.append('name', name)
  data.append('desc', desc)
  data.append('avatar', formData.value.avatar[0].file)
  const result = await requestEditProfile(data)
  if (result.code === ResponseCode.SUCCESS) {
    const newData = {
      name,
      desc,
    }
    if (result.data.avatar) {
      newData.avatar = result.data.avatar
    }
    store.commit(`userModule/${UPDATE_USER}`, newData)
    Notify({ type: 'success', message: '保存成功' })
  } else {
    Notify(result.msg)
  }
  Toast.clear()
}

onMounted(() => {
  const userInfo = store.state.userModule
  formData.value = {
    name: userInfo.name,
    desc: userInfo.desc,
    avatar: [],
  }
  if (userInfo.avatar) {
    formData.value.avatar = [{ url: userInfo.avatar }]
  }
})
</script>
<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  background-color: #f7f8fa;
  width: 100%;
  display: flex;
  flex-direction: column;
  .form {
    padding: 0 16px;
    margin-bottom: auto;
  }
  .button-group {
    margin-top: auto;
    padding: 0 20px;
    margin-bottom: 20px;
    > button + button {
      margin-top: 20px;
    }
  }
}
</style>
