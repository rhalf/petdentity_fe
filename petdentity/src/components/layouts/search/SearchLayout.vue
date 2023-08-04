<template>
  <v-app>
    <v-main>
      <Navbar v-model:drawer="drawer" />
      <!-- <Sidebar v-model="drawer" /> -->

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
// import Sidebar from "./components/sidebar/Sidebar.vue";

import { ref } from "vue";
const drawer = ref(false);
</script>
