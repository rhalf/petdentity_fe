<template>
  <v-app>
    <v-main>
      <Navbar v-model:drawer="drawer" />
      <Sidebar v-model="drawer" />

      <router-view v-slot="{ Component }">
        <!-- <v-fade-transition> -->
        <component :is="Component" />
        <!-- </v-fade-transition> -->
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import _ from "lodash";
import Navbar from "./components/navbar/Navbar.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { get } from "@/api/user";
import { getCurrentUser } from "@/utils/firebase";

import { ref, onMounted } from "vue";
const drawer = ref(false);

onMounted(async () => {
  try {
    start();
    const { uid } = await getCurrentUser();
    const user = await get(uid);
    if (user.roles.includes(route.meta.authorization)) console.log("ALLOWED");
    else router.push({ name: "ForbiddenView" });
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
