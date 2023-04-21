import { createRouter, createWebHistory } from 'vue-router'

import ExternalLayout from '@/components/layouts/ExternalLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/session',
      component: ExternalLayout,
      children: [
        {
          name: 'SessionLogin',
          path: 'login',
          component: () => import('@/views/session/login/LoginView.vue')
        },
        {
          name: 'SessionForgot',

          path: 'forgot',
          component: () => import('@/views/session/forgot/ForgotView.vue')
        },
        {
          name: 'SessionSignup',
          path: 'signup',
          component: () => import('@/views/session/signup/SignupView.vue')
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

export default router
