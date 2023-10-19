import SearchGovernmentsLayout from "@/layouts/search-governments/SearchGovernmentsLayout.vue";

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
  ],
};
