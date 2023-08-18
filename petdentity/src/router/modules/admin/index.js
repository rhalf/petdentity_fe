import AdminLayout from "@/components/layouts/admin/AdminLayout.vue";

export const admin = {
  path: "/admin",
  component: AdminLayout,
  children: [
    {
      path: "dashboard",
      name: "AdminDashboard",
      component: () => import("@/views/admin/dashboard/DashboardView.vue"),
      meta: { authenticated: true, authorization: "ADMIN" },
    },
    {
      path: "animals",
      children: [
        {
          path: "summary",
          name: "AdminAnimalsSummary",
          component: () => import("@/views/admin/animals/AnimalsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "coats",
      children: [
        {
          path: "summary",
          name: "AdminCoatsSummary",
          component: () => import("@/views/admin/coats/CoatsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "units",
      children: [
        {
          path: "summary",
          name: "AdminUnitsSummary",
          component: () => import("@/views/admin/units/UnitsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
        {
          path: "bulk-upload",
          name: "AdminUnitsBulkUpload",
          component: () => import("@/views/admin/units/UnitsBulkUpload.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "users",
      children: [
        {
          path: "summary",
          name: "AdminUsersSummary",
          component: () => import("@/views/admin/users/UsersSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
        {
          path: ":id",
          name: "AdminUsersView",
          component: () => import("@/views/admin/users/UsersView.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "governments",
      children: [
        {
          path: "summary",
          name: "AdminGovernmentsSummary",
          component: () =>
            import("@/views/admin/governments/GovernmentsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
        {
          path: ":id",
          name: "AdminGovernmentView",
          component: () =>
            import("@/views/admin/governments/GovernmentView.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
  ],
};
