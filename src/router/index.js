import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from 'store/index'
import { Toast } from 'vant'
import { OrderStatus } from 'config/constants'

export const RouteName = {
  RECOMMEND: 'recommend',
  ADDRESS_LIST: 'addressList',
  ADDRESS_EDIT: 'addressEdit',
  COLLECTION: 'collection',
  GOOD: 'good',
  COUPON: 'coupon',
  LOGIN: 'login',
  EDIT_PROFILE: 'editProfile',
  CONFIRM_ORDER: 'confirmOrder',
  ORDER_LIST: 'orderList',
  ORDER_WAIT_SEND: OrderStatus.WAITDELIVER,
  ORDER_WAIT_RECEIVE: OrderStatus.FOR_GOODS,
  ORDER_WAIT_COMMENT: OrderStatus.TO_EVALUATE,
  ORDER_WAIT_PAY: OrderStatus.FOR_PAYMENT,
  ORDER_SUCESS: OrderStatus.SUCCESS,
  ORDER_REFUNDING: OrderStatus.REFUND_ING,
  ORDER_REFUND_END: OrderStatus.REFUND_END,
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
    component: () => import(/* webpackChunkName: "sort" */ 'views/CategoryPage'),
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchPage'),
  },
  {
    path: '/shoppingcar',
    component: () => import(/* webpackChunkName: "shoppingcar" */ 'views/ShoppingCarPage'),
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录以查看购物车信息')
        next({
          path: '/login',
        })
      }
    },
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "wode" */ 'views/profile/ProfilePage'),
  },
  {
    path: '/edit',
    name: RouteName.EDIT_PROFILE,
    component: () => import(/* webpackChunkName: "wode" */ 'views/profile/EditProfilePage'),
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录')
        next({
          path: '/login',
        })
      }
    },
  },
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import(/* webpackChunkName: "login" */ 'views/LoginPage'),
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ 'views/RegisterPage'),
  },
  {
    path: '/address',
    component: () => import(/* webpackChunkName: "address" */ 'views/address/AddressLayout'),
    children: [
      {
        path: '',
        name: RouteName.ADDRESS_LIST,
        component: () => import(/* webpackChunkName: "address" */ 'views/address/AddressListPage'),
      },
      {
        path: 'edit/:id',
        name: RouteName.ADDRESS_EDIT,
        component: () => import(/* webpackChunkName: "address" */ 'views/address/EditAddressPage'),
      },
    ],
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录以查看地址信息')
        next({
          path: '/login',
        })
      }
    },
  },
  {
    path: '/collection',
    component: () => import(/* webpackChunkName: "favor" */ 'views/collect/CollectionsPage'),
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录以查看收藏信息')
        next({
          path: '/login',
        })
      }
    },
    name: RouteName.COLLECTION,
  },
  {
    path: '/good/:id',
    component: () => import(/* webpackChunkName: "goodDetail" */ 'views/good_detail/GoodDetailPage'),
    name: RouteName.GOOD,
  },
  {
    path: '/coupon',
    component: () => import(/* webpackChunkName: "goodDetail" */ 'views/coupon/CouponPage'),
    name: RouteName.COUPON,
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录以查看地址信息')
        next({
          path: '/login',
        })
      }
    },
  },
  {
    path: '/orderdetail',
    component: () => import(/* webpackChunkName: "goodDetail" */ 'views/order/OrderDetailLayout'),
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录')
        next({
          path: '/login',
        })
      }
    },
    children: [
      {
        path: 'confirm',
        name: RouteName.CONFIRM_ORDER,
        component: () => import('views/order/ConfirmOrderDetail'),
      },
      {
        path: 'waitsend',
        name: RouteName.ORDER_WAIT_SEND,
        component: () => import('views/order/OrderPostPage'),
      },
      {
        path: 'waitpay',
        name: RouteName.ORDER_WAIT_PAY,
        component: () => import('views/order/OrderWaitPay'),
      },
      {
        path: 'waitreceive',
        name: RouteName.ORDER_WAIT_RECEIVE,
        component: () => import('views/order/OrderPostPage'),
      },
      {
        path: 'waitcomment',
        name: RouteName.ORDER_WAIT_COMMENT,
        component: () => import('views/order/OrderSuccess'),
      },
      {
        path: 'sucess',
        name: RouteName.ORDER_SUCESS,
        component: () => import('views/order/OrderSuccess'),
      },
      {
        path: 'refundwait',
        name: RouteName.ORDER_REFUNDING,
        component: () => import('views/order/OrderRefund'),
      },
      {
        path: 'refundsucess',
        name: RouteName.ORDER_REFUND_END,
        component: () => import('views/order/OrderRefund'),
      },
    ],
  },
  {
    path: '/orderlist',
    name: RouteName.ORDER_LIST,
    component: () => import(/* webpackChunkName: "goodDetail" */ 'views/order/OrderListPage'),
    beforeEnter(to, from, next) {
      if (store.state.isLogin) {
        next()
      } else {
        Toast('请先登录')
        next({
          path: '/login',
        })
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
