import axios from 'axios'
import { Toast } from 'vant'
// import { useStore } from 'vuex'
import store from '../src/store/index'
import router from '../src/router/index'

// const router = useRoute()
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3007' : ''
// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.210.93' : ''
axios.defaults.baseURL = baseUrl
axios.interceptors.request.use(
  (config) => {
    const { token } = store.state
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  },
)

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.ToastMessage) {
        Toast({
          message: res.data.ToastMessage,
          duration: 1000,
          forbidClick: true,
        })
      }
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.push({
            path: '/login',
          })
          break
        case 403:
          console.log(error.response.status)
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true,
          })
          localStorage.removeItem('token')
          store.commit('setIsLogin', false)
          setTimeout(() => {
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            })
          }, 1000)
          break
        case 404:
          console.log(error.response.status)
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true,
          })
          break
        default:
          console.log(error.response.status)
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true,
          })
      }
      return Promise.reject(error.response)
    }
  },
)

// get请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error.data)
      })
  })
}

// post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error.data)
      })
  })
}

export const mockServer = axios.create({
  baseURL: 'http://127.0.0.1:4523/mock/909468/api',
})
