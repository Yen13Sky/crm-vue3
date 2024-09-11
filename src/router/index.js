import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/AppHome'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/AppHelp.vue'),
    meta: {
      layout: 'main',
      auth: true
    }

  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/Request.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AppAuth.vue'),
    meta: {
      layout: 'auth'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuth']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuth']) {
    next('/auth')
  } else {
    next()
  }
})

export default router
