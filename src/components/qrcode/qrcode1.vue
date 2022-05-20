<template>
    <div class="qrcode">
        <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  // 注册
  components: { QrcodeStream },
  methods: {
    onDecode (result) {
      alert(result)
      this.result = result
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: 您需要授予相机访问权限'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: 这个设备上没有摄像头'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: 所需的安全上下文(HTTPS、本地主机)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: 相机被占用'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: 安装摄像头不合适'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: 此浏览器不支持流API'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
