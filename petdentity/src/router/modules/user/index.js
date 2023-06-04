import UserLayout from '@/components/layouts/user/UserLayout.vue'

export const user = {
  path: '/user',
  component: UserLayout,
  children: [
    {
      path: 'dashboard',
      name: 'UserDashboard',
      component: () => import('@/views/user/dashboard/DashboardView.vue'),
      meta: { authenticated: true }
    },
    {
      path: 'profile',
      name: 'UserProfile',
      component: () => import('@/views/user/profile/ProfileView.vue'),
      meta: { authenticated: true }
    },
    {
      path: 'password',
      name: 'UserPassword',
      component: () => import('@/views/user/password/PasswordView.vue'),
      meta: { authenticated: true }
    }
  ]
}
