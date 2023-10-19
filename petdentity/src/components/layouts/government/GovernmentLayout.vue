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

import { getCurrentUser } from "@/utils/firebase";

import { get as getUser } from "@/api/users";
import { get as getGovernment } from "@/api/government";
import { get as getGovernmentUser } from "@/api/government/users";

import { ref, onMounted, provide } from "vue";
const drawer = ref(false);

const user = ref(null);
const government = ref(null);
const governmentUser = ref(null);

provide("user", user);
provide("government", government);

onMounted(async () => {
  try {
    start();

    const { uid } = await getCurrentUser();
    user.value = await getUser(uid);
    government.value = await getGovernment(route.params.governmentId);
    governmentUser.value = await getGovernmentUser(
      government.value,
      user.value
    );

    if (!governmentUser.value) {
      show("error", "You are not authorized to access!");
      await router.back();
    }
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
