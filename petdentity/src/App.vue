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

import { setUser } from '@/utils/local-storage/session'
import { auth } from '@/plugins/firebase'

auth.onAuthStateChanged((user) => {
  setUser(user)
})
</script>
