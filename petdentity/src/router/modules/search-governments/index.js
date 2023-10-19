import SearchGovernmentsLayout from "@/components/layouts/search-governments/SearchGovernmentsLayout.vue";

export const searchGovernments = {
  path: "/search-governments",
  component: SearchGovernmentsLayout,
  children: [
    {
      path: "dashboard",
      name: "SearchGovernmentsDashboard",
      component: () =>
        import("@/views/search-governments/dashboard/DashboardView.vue"),
    },
    // {
    //   path: "searchGovernments/:id",
    //   name: "SearchGovernment",
    //   component: () => import("@/views/searchGovernments/searchGovernments/GovernmentView.vue"),
    //   meta: { mode: "VIEW" },
    // },
  ],
};
