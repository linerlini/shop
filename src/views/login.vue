<template>
<div class="login">
  <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ pattern:pattern1, required: true, message: '请填写用户名,6-10位数字' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ pattern:pattern2, required: true, message: '请填写密码,6-10位数字字母组成,必须包含数字、大小写字母' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
  <div class="back" @click="back" ></div>
  <router-link to="/register" class="go">没有账号？点击注册！</router-link>
</van-form>
<Vcode :show="isShow" @success="onSuccess" @close="onClose" />
</div>
</template>
<script setup>
import { Toast, Form as vanForm, Field as vanField, CellGroup as vanCellGroup, Button as vanButton } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../server/login'
import { useStore } from 'vuex'
import { TOKEN_KEY } from '../assets/js/constant'
import Vcode from 'vue3-puzzle-vcode'
const router = useRouter()
const store = useStore()
const username = ref('')
const password = ref('')
const pattern1 = /\d{6,10}/
const pattern2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){6,10}/

const isShow = ref(false)

const onShow = () => {
  isShow.value = true
}

const onClose = () => {
  isShow.value = false
}

const onSuccess = async () => {
  onClose() // 验证成功，需要手动关闭模态框
  const toast = Toast.loading({
    message: '登陆中...',
    forbidClick: true,
    loadingType: 'spinner'
  })
  const result = await login({ username: username.value, password: password.value })
  toast.clear()
  if (result.status === 1) {
    localStorage.setItem(TOKEN_KEY, result.token)
    store.state.token = result.token
    router.go(-1)
  }
}

const back = () => {
  router.go(-1)
}

const onSubmit = () => {
  onShow()
}
</script>
<style lang="scss" scoped>
.van-button--primary {
  background-color: #00AFEC;
}
.login {
  width: 100%;
  height: 100%;
  z-index: 981;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(18, 236, 200);
  // background-size: 100% 100%;
  // background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs2.best-wallpaper.net%2Fwallpaper%2Fiphone%2F2006%2FFruit-and-vegetables-apples-grapes-pears_iphone_750x1334.jpg&refer=http%3A%2F%2Fs2.best-wallpaper.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653961469&t=7903f6454858fe5c5790067365ec2c0c&qq-pf-to=pcqq.c2c);
  .back {
    width: 25px;
    height: 25px;
    position: absolute;
    left:20px;
    top: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==) no-repeat 50%;
    background-position: 0 0;
    background-size: contain;
  }
  .go {
    display: block;
    position: absolute;
    right:30px;
    top: 30px;
    color: aquamarine;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
