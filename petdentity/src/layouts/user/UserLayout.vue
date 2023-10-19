<template>
  <v-app>
    <v-main>
      <Navbar />
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
</script>
