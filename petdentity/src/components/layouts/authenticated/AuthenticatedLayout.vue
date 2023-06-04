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

import { getUser } from '@/utils/local-storage/session'
import { onMounted } from 'vue'


import {getByUid} from "@/api/users"
onMounted(() => {
  progressLine.on()
  progressLine.off()

 getByUid('ryoxAuDHxH4UAATrLsJQ')
 .then((data)=>{
  console.log(data)
 })
 .catch(({message})=>{
console.log(message)
 })

})
</script>
