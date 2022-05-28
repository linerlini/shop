import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from 'store/index'
import { Toast } from 'vant'

export const RouteName = {
  RECOMMEND: 'recommend',
}
const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    name: RouteName.RECOMMEND,
    component: () => import(/* webpackChunkName: "recommend" */ 'views/recommend/RecommendPage'),
  },
  {
    path: '/sort',
    component: () => import(/* webpackChunkName: "sort" */ '../views/sort.vue'),
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchPage'),
  },
  {
    path: '/shoppingcar',
    component: () => import(/* webpackChunkName: "shoppingcar" */ '../views/shoppingcar.vue'),
    beforeEnter: () => {
      if (store.state.token.length === 0) {
        Toast('请先登录以查看购物车信息')

        return {
          path: '/login',
        }
      }
      return true

      // reject the navigation
    },
  },
  {
    path: '/wode',
    component: () => import(/* webpackChunkName: "wode" */ '../views/wode.vue'),
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue'),
  },
  {
    path: '/orderdetail',
    component: () => import(/* webpackChunkName: "orderdetail" */ '../views/orderdetail.vue'),
  },
  {
    path: '/order',
    component: () => import(/* webpackChunkName: "order" */ '../views/order.vue'),
  },
  {
    path: '/address',
    component: () => import(/* webpackChunkName: "address" */ '../views/address.vue'),
  },
  {
    path: '/favor',
    component: () => import(/* webpackChunkName: "favor" */ '../views/favor.vue'),
  },
  {
    path: '/good/:id',
    component: () => import(/* webpackChunkName: "goodDetail" */ 'views/good_detail/GoodDetailPage'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
