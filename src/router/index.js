import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { getUserAuth } from '@/store/userManagement'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/web_base/OverviewPage.vue')
  },
  {
    path: '/settings',
    children: [
      {
        path: 'user',
        name: 'UserSetting',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/UserSetting.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
  },
  {
    path: '/admin',
    children: [
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/error/handle-403',
    name: 'HandleError403Page',
    component: () => import(/* webpackChunkName: "error" */ '@/views/handle_error/Handle403.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const userAuth = getUserAuth()

  const currentPath = to.path
  if (userAuth === null || userAuth === undefined) {
    if (currentPath !== '/login') {
      next({ name: 'LoginPage' })
    }
  } else {
    next()
    // if (to.path.startsWith('/setting') || to.path.startsWith('/overview')) {

    // } else {
    //   next()
    // }
  }
  if (to.matched.length === 0) {
    window.location.href = '/error/handle-403'
  } else {
    next() // Continue with the navigation
  }
})
export default router
