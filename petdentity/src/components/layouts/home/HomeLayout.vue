<template>
  <v-app>
    <v-main>
      <router-view v-slot="{ Component }">
        <!-- <v-fade-transition> -->
        <component :is="Component" />
        <!-- </v-fade-transition> -->
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useProgressLineStore } from "@/store/progress-line";
const progressLine = useProgressLineStore();

import { onMounted } from "vue";

onMounted(() => {
  progressLine.start();
  progressLine.stop();
});
</script>
