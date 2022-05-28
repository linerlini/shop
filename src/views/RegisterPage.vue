<template>
  <div class="login">
    <van-form @submit="handleValidateCodeShow">
      <van-cell-group inset>
        <van-field v-model="formData.userName" name="userName" label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field
          v-model="formData.account"
          name="account"
          label="账号"
          placeholder="请输入账号，由6-10位数字组成"
          :rules="[{ pattern: accountReg, required: true, message: '请填写账号,6-10位数字' }]"
        />
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="6-10位,含数字、大小写"
          :rules="[{ pattern: passwordReg, required: true, message: '请填写密码,6-10位数字字母组成,必须包含数字、大小写字母' }]"
        />
        <van-field
          v-model="formData.repeatPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请再次确认密码"
          :rules="[{ validator: validateRepeatPassword, required: true, message: '两次密码输入不一致' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
      <div class="back" @click="back"></div>
      <!-- <router-link to="/login" class="go">已注册？点击登录！</router-link> -->
    </van-form>
    <Vcode :show="validateCodeVisible" @success="handleValidateCodeSuccess" @close="handleValidateCodeClose" />
  </div>
</template>
<script setup>
import { Toast, Form as vanForm, Field as vanField, CellGroup as vanCellGroup, Button as vanButton, Notify } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Vcode from 'vue3-puzzle-vcode'
import { accountReg, passwordReg, ResponseCode } from 'config/constants'
import { requestRegister } from 'server/user'
import { INIT_LOGIN } from 'store/actions'

const router = useRouter()
const store = useStore()

const formData = reactive({
  userName: '',
  account: '',
  password: '',
  repeatPassword: '',
})
// 验证码
const validateCodeVisible = ref(false)
const handleValidateCodeShow = () => {
  validateCodeVisible.value = true
}
const handleValidateCodeClose = () => {
  validateCodeVisible.value = false
}

const handleValidateCodeSuccess = async () => {
  handleValidateCodeClose() // 验证成功，需要手动关闭模态框
  const toast = Toast.loading({
    message: '注册中...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  const result = await requestRegister(formData.account, formData.password, formData.userName)
  if (result.code === ResponseCode.SUCCESS) {
    const { data } = result
    await store.dispatch(INIT_LOGIN, data)
    router.go(-2)
  } else {
    Notify(result.msg)
  }
  toast.clear()
}

const validateRepeatPassword = (value) => {
  return value === formData.password
}
</script>
<style lang="scss" scoped>
.van-button--primary {
  background-color: #00afec;
}
.login {
  width: 100%;
  height: 100%;
  z-index: 981;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(96, 236, 225);
  .back {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 20px;
    top: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==)
      no-repeat 50%;
    background-position: 0 0;
    background-size: contain;
  }
  // .go {
  //   display: block;
  //   position: absolute;
  //   right:30px;
  //   top: 30px;
  //   color: aquamarine;
  //   &:hover {
  //     text-decoration: underline;
  //   }
  // }
}
</style>
