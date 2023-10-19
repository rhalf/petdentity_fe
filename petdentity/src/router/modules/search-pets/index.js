import SearchLayout from "@/layouts/search-pets/SearchPetsLayout.vue";

export const searchPets = {
  path: "/search-pets",
  component: SearchLayout,
  children: [
    {
      path: "dashboard",
      name: "SearchPetsDashboard",
      component: () =>
        import("@/views/search-pets/dashboard/DashboardView.vue"),
    },
    {
      path: "pet/:id",
      name: "SearchPet",
      component: () => import("@/views/search-pets/pet/PetView.vue"),
      meta: { mode: "VIEW" },
    },
  ],
};
