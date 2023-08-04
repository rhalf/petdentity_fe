import SearchLayout from "@/components/layouts/search/SearchLayout.vue";

export const search = {
  path: "/search",
  component: SearchLayout,
  children: [
    {
      path: "dashboard",
      name: "SearchDashboard",
      component: () => import("@/views/search/dashboard/DashboardView.vue"),
    },
    {
      path: "pet/:id",
      name: "SearchPet",
      component: () => import("@/views/search/pet/PetView.vue"),
      meta: { mode: "VIEW" },
    },
  ],
};
