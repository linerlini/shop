import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index'
import { Toast } from 'vant'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend.vue')
  },
  {
    path: '/sort',
    component: () => import(/* webpackChunkName: "sort" */ '../views/sort.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
  },
  {
    path: '/shoppingcar',
    component: () => import(/* webpackChunkName: "shoppingcar" */ '../views/shoppingcar.vue'),
    beforeEnter: (to, from) => {
      if (store.state.token.length === 0) {
        Toast('请先登录以查看购物车信息')
        router.push({
          path: '/login'
        })
        return false
      } else {
        return true
      }
      // reject the navigation
    }
  },
  {
    path: '/wode',
    component: () => import(/* webpackChunkName: "wode" */ '../views/wode.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
  {
    path: '/orderdetail',
    component: () => import(/* webpackChunkName: "orderdetail" */ '../views/orderdetail.vue')
  },
  {
    path: '/order',
    component: () => import(/* webpackChunkName: "order" */ '../views/order.vue')
  },
  {
    path: '/address',
    component: () => import(/* webpackChunkName: "address" */ '../views/address.vue')
  },
  {
    path: '/favor',
    component: () => import(/* webpackChunkName: "favor" */ '../views/favor.vue')
  },
  {
    path: '/good/:id',
    component: () => import(/* webpackChunkName: "goodDetail" */ '../views/good_detail.vue')
    // children: [
    //   {
    //     path: 'comment',
    //     component: () => import(/* webpackChunkName: "comment_detail" */ '../views/comment_detail.vue')
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
// import { createRouter, createWebHashHistory } from 'vue-router'
// const Recommend = () => import('../views/recommend.vue' /* webpackChyunkName: "recommend" */)
// const TopList = () => import('../views/top-list.vue' /* webpackChunkName: "TopList" */)
// const Search = () => import('../views/search.vue' /* webpackChunkName: "Search" */)
// const Singer = () => import('../views/singer.vue' /* webpackChunkName: "Singer" */)
// const SingerDetail = () => import('../views/singer-detail' /* webpackChunkName: "SingerDetail" */)
// const Album = () => import('../views/album' /* webpackChunkName: "Album" */)
// const TopDetail = () => import('../views/top-detail' /* webpackChunkName: "TopDetail" */)
// const UserCenter = () => import('../views/user-center' /* webpackChunkName: "UserCenter" */)

// import Recommend from '../views/recommend.vue'
// import TopList from '../views/top-list.vue'
// import Search from '../views/search.vue'
// import Singer from '../views/singer.vue'
// import SingerDetail from '../views/singer-detail'
// import Album from '../views/album'
// import TopDetail from '../views/top-detail'
// import UserCenter from '../views/user-center'

// const routes = [
//   {
//     path: '/',
//     redirect: '/recommend'
//   },
//   {
//     path: '/recommend',
//     component: Recommend,
//     children: [
//       {
//         path: ':id',
//         component: Album
//       }
//     ]
//   },
//   {
//     path: '/singer',
//     component: Singer,
//     children: [
//       {
//         path: ':id',
//         component: SingerDetail
//       }
//     ]
//   },
//   {
//     path: '/top-list',
//     component: TopList,
//     children: [
//       {
//         path: ':id',
//         component: TopDetail
//       }
//     ]
//   },
//   {
//     path: '/search',
//     component: Search,
//     children: [
//       {
//         path: ':id',
//         component: SingerDetail
//       }
//     ]
//   },
//   {
//     path: '/user',
//     components: {
//       user: UserCenter
//     }
//   }
// ]
