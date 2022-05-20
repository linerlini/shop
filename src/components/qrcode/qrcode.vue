<template>
<div class="qrcode">
    <video ref="video" id="video" class="video" autoplay></video>
    <!-- <div v-show="tipShow" class="tip">{{tipMsg}}</div> -->
</div>
</template>
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'

const router = useRouter()
const codeReader = ref(new BrowserMultiFormatReader())
const tipMsg = ref('正在尝试识别')
const tipShow = ref(false)

const openScan = async () => {
  codeReader.value.getVideoInputDevices().then((videoInputDevices) => {
    tipShow.value = true
    tipMsg.value = '正在调用后置摄像头...'
    //   console.log('videoInputDevices', videoInputDevices);
    // 默认获取第一个摄像头设备id
    let firstDeviceId = videoInputDevices[0].deviceId
    // 获取第一个摄像头设备的名称
    const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label)
    if (videoInputDevices.length > 1) {
      // 判断是否后置摄像头
      if (videoInputDeviceslablestr.indexOf('back') > -1) {
        firstDeviceId = videoInputDevices[0].deviceId
      } else {
        firstDeviceId = videoInputDevices[1].deviceId
      }
    }
    decodeFromInputVideoFunc(firstDeviceId)
  }).catch((err) => {
    tipShow.value = false
    console.error(err)
  })
}
const decodeFromInputVideoFunc = (firstDeviceId) => {
  codeReader.value.reset() // 重置
  codeReader.value.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
    tipMsg.value = '正在尝试识别...'
    if (result) {
      // console.log(result)
      // textContent.value = result.text
      const regstr = location.origin
      const reg = new RegExp(`^${regstr}`)
      // console.log(reg)
      if (reg.test(result.text)) {
        // console.log(1)
        const index = result.text.indexOf('#')
        // console.log(index)
        const path = result.text.slice(index + 1)
        // console.log(path)
        router.push({
          path
        })
        codeReader.value.reset()
      } else {
        // console.log(2)
        Dialog.alert({
          title: '识别结果',
          message: result.text
        }).then(() => {
          // on close
        })
      }
    }
    if (err && !(err)) {
      tipMsg.value = '识别失败'
      setTimeout(() => {
        tipShow.value = false
      }, 2000)
      console.error(err)
    }
  })
}

onBeforeUnmount(() => {
  codeReader.value.reset()
})
openScan()
</script>
<style scoped lang="scss">
.qrcode {
  width: 100%;
  height: 100%;
}
.video {
  width: 100%;
  height: 100%;
}
</style>
