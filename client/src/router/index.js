import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import { gennerateRoutes } from '../libs/index'
import storage from '../libs/storage'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    meta: {
      name: '欢迎'
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: Welcome,
        meta: {
          name: '欢迎页'
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function loadRoutesWithLocalUser() {
  try {
    if (storage.getItem('userInfo') && storage.getItem('userInfo').token) {
      const menuList = store.state.menuList || storage.getItem('menuList')
      const routes = gennerateRoutes(menuList)
      routes.forEach((item) => {
        router.addRoute('Home', item)
      })
      console.log('routes: ', router.getRoutes())
    }
  } catch (error) {
    console.log(error.stack)
  }
}

// load router before guard
loadRoutesWithLocalUser()

function checkPermisson(path) {
  const hasPermisson = router
    .getRoutes()
    .filter((item) => item.path === path).length
  if (hasPermisson) {
    return true
  } else {
    return false
  }
}
router.beforeEach((to, from, next) => {
  if (checkPermisson(to.path)) {
    next()
  } else {
    next('/404')
  }
})

export default router
