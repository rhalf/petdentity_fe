import { createRouter, createWebHistory } from "vue-router";

// import HomeLayout from "@/layouts/home/HomeLayout.vue";

import { user } from "./modules/user";
import { admin } from "./modules/admin";
import { session } from "./modules/session";
import { owner } from "./modules/owner";
import { government } from "./modules/government/index";

import { searchPets } from "./modules/search-pets";
import { searchGovernments } from "./modules/search-governments";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/session/login",
      //component: HomeLayout,
      // children: [
      //   {
      //     path: "/",
      //     name: "Home",
      //     component: () => import("@/views/home/HomeView.vue"),
      //     meta: { authenticated: false },
      //   },
      // ],
    },

    {
      path: "/forbidden",
      name: "ForbiddenView",
      component: () => import("@/views/forbidden/ForbiddenView.vue"),
      meta: { authenticated: false },
    },

    { ...session },
    { ...user },
    { ...admin },
    { ...owner },
    { ...government },
    { ...searchPets },
    { ...searchGovernments },
  ],
});

import { getCurrentUser } from "@/utils/firebase";
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const { authenticated } = to.meta;

  document.title = `Petdentity - ${to.name}`;

  if (!authenticated && !user) next();
  if (authenticated && !user) next({ name: "SessionLogin" });
  if (!authenticated && user) next();
  if (authenticated && user) next();
});

export default router;
