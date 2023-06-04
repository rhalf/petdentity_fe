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

import { useSnackbarStore } from '@/stores/snackbar'
const { show } = useSnackbarStore()

import { USER } from '@/data/structure'

import { getUser } from '@/utils/local-storage/session'
import { onMounted } from 'vue'

import { getByUid, create } from '@/api/users'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/stores/user'
const user = useUserStore()

onMounted(() => {
  progressLine.on()
  getByUid(getUser().uid)
    .then(async (data) => {
      if (data === null) {
        await create(getUser().uid, USER)
          .then(() => {
            show('success', 'created a user')
            router.go()
          })
          .catch(() => {
            show('error', message)
          })
      } else {
        user.set(data)
      }
    })
    .catch(({ message }) => {
      show('error', message)
    })
    .finally(() => {
      progressLine.off()
    })
})
</script>
