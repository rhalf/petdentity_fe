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

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import { get as getGovernment } from "@/api/government";
import { get as getGovernmentUser } from "@/api/government/users";

import { ref, watchEffect, provide, inject } from "vue";
const drawer = ref(false);

import { UserGroups } from "@/constants";

const user = inject("user");
const government = ref(null);

provide("government", government);

watchEffect(async () => {
  try {
    start();
    const newGovernment = await getGovernment(route.params.governmentId);
    const userStatus = await getGovernmentUser(newGovernment, user.value);

    const { roles } = user.value;
    const included = roles.includes(UserGroups.ADMIN);

    if (!!userStatus || included) {
      console.log("ALLOWED");
      government.value = newGovernment;
    } else {
      show("error", "You are not authorized to access!");
      router.push({ name: "SearchGovernmentsDashboard" });
    }
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
