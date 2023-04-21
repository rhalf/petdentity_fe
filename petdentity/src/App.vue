<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script setup>
import Snackbar from '@/components/common/Snackbar.vue'
</script>

<style>
html,
body {
  font-family: 'Poppins', sans-serif;
}

#app {
  font-family: 'Poppins', sans-serif;
}
</style>
