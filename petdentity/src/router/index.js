import { createRouter, createWebHistory } from 'vue-router'

import SessionLayout from '@/components/layouts/session/SessionLayout.vue'
import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayout.vue'
import HomeLayout from '@/components/layouts/home/HomeLayout.vue'

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
    {
      path: '/user',
      component: AuthenticatedLayout,
      children: [
        {
          path: 'dashboard',
          name: 'UserDashboard',
          component: () => import('@/views/user/dashboard/DashboardView.vue'),
          meta: { authenticated: true }
        }
      ]
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

import { getUser } from '@/utils/session'
router.beforeEach((to, from, next) => {
  const user = getUser()

  if (!to.meta.authenticated && !user) next()
  if (to.meta.authenticated && !user) next({ name: 'SessionLogin' })
  if (to.meta.authenticated && user) next()
  if (!to.meta.authenticated && user) next({ name: 'UserDashboard' })
})

export default router
