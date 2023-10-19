import GovernmentLayout from "@/layouts/government/GovernmentLayout.vue";

export const government = {
  path: "/government",
  component: GovernmentLayout,
  children: [
    {
      path: ":governmentId/dashboard",
      name: "GovernmentDashboard",
      component: () => import("@/views/government/dashboard/DashboardView.vue"),
    },
    {
      path: ":governmentId/profile",
      name: "GovernmentProfile",
      component: () => import("@/views/government/profile/ProfileView.vue"),
    },

    {
      path: ":governmentId/units",
      name: "GovernmentUnits",
      component: () => import("@/views/government/units/UnitsSummary.vue"),
    },

    {
      path: ":governmentId/pets",
      name: "GovernmentPets",
      component: () => import("@/views/government/pets/PetsSummary.vue"),
    },
    {
      path: ":governmentId/pets/:petId",
      name: "GovernmentPetView",
      component: () => import("@/views/government/pets/PetView.vue"),
      meta: { mode: "VIEW" },
    },
    {
      path: ":governmentId/users",
      name: "GovernmentUsers",
      component: () => import("@/views/government/users/UsersSummary.vue"),
    },
    {
      path: ":governmentId/users/:userId",
      name: "GovernmentUserView",
      component: () => import("@/views/government/users/UserView.vue"),
    },
  ],
};
