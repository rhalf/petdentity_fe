import GovernmentLayout from "@/components/layouts/government/GovernmentLayout.vue";

export const government = {
  path: "/government",
  component: GovernmentLayout,
  children: [
    {
      path: "dashboard",
      name: "GovernmentDashboard",
      component: () => import("@/views/government/dashboard/DashboardView.vue"),
    },
    // {
    //   path: "government/:id",
    //   name: "SearchGovernment",
    //   component: () => import("@/views/government/government/GovernmentView.vue"),
    //   meta: { mode: "VIEW" },
    // },
  ],
};
