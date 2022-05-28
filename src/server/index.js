import axios from 'axios'
import { ResponseCode } from 'config/constants'

function useInterceptors(axiosInstance, interceptors) {
  if (!interceptors) {
    return
  }
  if (Array.isArray(interceptors.requestInterceptors)) {
    interceptors.requestInterceptors.forEach((func) => axiosInstance.interceptors.request.use(func))
  }
  if (Array.isArray(interceptors.requestInterceptorsCatch)) {
    interceptors.requestInterceptorsCatch.forEach((func) => axiosInstance.interceptors.request.use(undefined, func))
  }
  if (Array.isArray(interceptors.responseInterceptors)) {
    interceptors.responseInterceptors.forEach((func) => axiosInstance.interceptors.response.use(func))
  }
  if (Array.isArray(interceptors.responseInterceptorsCatch)) {
    interceptors.responseInterceptorsCatch.forEach((func) => axiosInstance.interceptors.response.use(undefined, func))
  }
}
function handleAxiosError(error) {
  if (error.response) {
    return {
      data: {
        code: ResponseCode.RESPONSE_ERROR,
        data: null,
        msg: '请求错误，请联系管理员',
      },
    }
  }
  if (error.request) {
    return {
      data: {
        code: ResponseCode.NETWORK_ERROR,
        data: null,
        msg: '网络出错，请检查您的网络状况',
      },
    }
  }
  // 请求被取消或者发送请求时异常，对应上面的 2 & 3
  return {
    data: {
      code: ResponseCode.NETWORK_ERROR,
      data: null,
      msg: '写错了个人看哈',
    },
  }
}
const createAxiosInstance = (config, interceptors) => {
  const instance = axios.create(config)
  instance.interceptors.response.use(undefined, (error) => {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error)
    }
    return {
      data: {
        code: ResponseCode.RESPONSE_ERROR,
        data: null,
        msg: '未知错误',
      },
    }
  })
  instance.interceptors.request.use(undefined, (error) => {
    console.error(error)
    return {
      data: {
        code: ResponseCode.RESPONSE_ERROR,
        data: null,
        msg: '未知错误',
      },
    }
  })
  useInterceptors(instance, interceptors)
  return instance
}

const serve = createAxiosInstance({
  baseURL: '/api',
})
export default serve
