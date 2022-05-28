import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import App from './App'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import './style/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require('./assets/images/logo.png'),
  })
  .mount('#app')
