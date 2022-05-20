import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import '../src/assets/scss/index.scss'

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('../src/assets/images/logo.png')
}).mount('#app')
