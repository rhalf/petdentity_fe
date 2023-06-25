<template>
  <v-app>
    <router-view />
    <Snackbar />
  </v-app>
</template>

<script setup>
import Snackbar from "@/components/common/Snackbar.vue";
</script>
