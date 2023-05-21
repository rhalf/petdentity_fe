<template>
  <v-app>
    <v-main>
      <ProgressLine :indeterminate="progressLine.status" :visible="progressLine.status" />
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
import Navbar from './components/navbar/Navbar.vue'

import ProgressLine from '@/components/common/ProgressLine.vue'

import { useProgressLineStore } from '@/stores/progress-line'
const progressLine = useProgressLineStore()

import { onMounted } from 'vue'

onMounted(() => {
  progressLine.on()
  progressLine.off()
})
</script>
