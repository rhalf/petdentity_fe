import UserLayout from '@/components/layouts/user/UserLayout.vue'

export const admin = {
  path: '/admin',
  component: UserLayout,
  children: [
    {
      path: 'dashboard',
      name: 'AdminDashboard',
      component: () => import('@/views/admin/dashboard/DashboardView.vue'),
      meta: { authenticated: true }
    }
  ]
}
