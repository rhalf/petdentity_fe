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
import Navbar from "./components/navbar/Navbar.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { ref, watchEffect, inject } from "vue";
const drawer = ref(false);

const user = inject("user");

watchEffect(async () => {
  try {
    start();

    const { roles } = user.value;
    const included = roles.includes(route.meta.authorization);

    if (included) console.log("ALLOWED");
    else router.push({ name: "ForbiddenView" });
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
