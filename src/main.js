import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import { requestAutoLogin } from 'server/user'
import { ResponseCode } from 'config/constants'
import { INIT_LOGIN } from 'store/actions'
import { TOKEN_KEY } from 'assets/js/constant'
import { load, clear } from 'assets/js/storage'
import App from './App'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import './style/index.css'

requestAutoLogin()
  .then(async (res) => {
    if (res.code === ResponseCode.SUCCESS) {
      const { data } = res
      const token = load(TOKEN_KEY)
      await store.dispatch(INIT_LOGIN, { userInfo: data.userInfo, token, coupons: data.coupons })
    } else {
      clear(TOKEN_KEY)
    }
  })
  .finally(() => {
    createApp(App)
      .use(store)
      .use(router)
      .use(lazyPlugin, {
        loading: require('./assets/images/logo.png'),
      })
      .mount('#app')
  })
