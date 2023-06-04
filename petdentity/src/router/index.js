import { createRouter, createWebHistory } from 'vue-router'

import SessionLayout from '@/components/layouts/session/SessionLayout.vue'
import HomeLayout from '@/components/layouts/home/HomeLayout.vue'

import { user } from './modules/user'
import { admin } from './modules/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/home/HomeView.vue'),
          meta: { authenticated: false }
        }
      ]
    },
    {
      path: '/session',
      component: SessionLayout,
      children: [
        {
          path: 'login',
          name: 'SessionLogin',
          component: () => import('@/views/session/login/LoginView.vue'),
          meta: { authenticated: false }
        },
        {
          path: 'forgot',
          name: 'SessionForgot',
          component: () => import('@/views/session/forgot/ForgotView.vue'),
          meta: { authenticated: false }
        },
        {
          path: 'signup',
          name: 'SessionSignup',
          component: () => import('@/views/session/signup/SignupView.vue'),
          meta: { authenticated: false }
        }
      ]
    },
    { ...user },
    { ...admin }
  ]
})

import { getUser } from '@/utils/local-storage/session'
router.beforeEach((to, from, next) => {
  const user = getUser()

  document.title = `Petdentity - ${to.name}`

  if (!to.meta.authenticated && !user) next()
  if (to.meta.authenticated && !user) next({ name: 'SessionLogin' })
  if (to.meta.authenticated && user) next()
  if (!to.meta.authenticated && user) next({ name: 'UserDashboard' })
})

export default router
