import OwnerLayout from "@/components/layouts/owner/OwnerLayout.vue";

export const owner = {
  path: "/owner",
  component: OwnerLayout,
  children: [
    {
      path: "dashboard",
      name: "OwnerDashboard",
      component: () => import("@/views/owner/dashboard/DashboardView.vue"),
      meta: { authenticated: true, authorization: "OWNER" },
    },
    {
      path: "pets",
      children: [
        {
          path: "summary",
          name: "OwnerPetsSummary",
          component: () => import("@/views/owner/pets/PetsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "units",
      children: [
        {
          path: "summary",
          name: "OwnerUnitsSummary",
          component: () => import("@/views/owner/units/UnitsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
  ],
};
