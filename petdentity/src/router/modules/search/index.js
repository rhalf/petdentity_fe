import SearchLayout from "@/components/layouts/search/SearchLayout.vue";

export const search = {
  path: "/search",
  component: SearchLayout,
  children: [
    {
      path: "dashboard",
      name: "SearchDashboard",
      component: () => import("@/views/search/dashboard/DashboardView.vue"),
      meta: { authenticated: true },
    },
    // {
    //   path: "contacts",
    //   children: [
    //     {
    //       path: "summary",
    //       name: "OwnerContactsSummary",
    //       component: () => import("@/views/search/contacts/ContactsSummary.vue"),
    //       meta: { authenticated: true, authorization: "OWNER" },
    //     },
    //   ],
    // },
    // {
    //   path: "pets",
    //   children: [
    //     {
    //       path: "summary",
    //       name: "OwnerPetsSummary",
    //       component: () => import("@/views/search/pets/PetsSummary.vue"),
    //       meta: { authenticated: true, authorization: "OWNER" },
    //     },
    //     {
    //       path: ":id",
    //       name: "OwnerPetView",
    //       component: () => import("@/views/search/pets/view/PetView.vue"),
    //       meta: { authenticated: true, authorization: "OWNER" },
    //     },
    //   ],
    // },
    // {
    //   path: "units",
    //   children: [
    //     {
    //       path: "summary",
    //       name: "OwnerUnitsSummary",
    //       component: () => import("@/views/search/units/UnitsSummary.vue"),
    //       meta: { authenticated: true, authorization: "OWNER" },
    //     },
    //   ],
    // },
  ],
};
