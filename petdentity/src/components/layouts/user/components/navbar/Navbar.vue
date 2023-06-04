<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <Logo :width="45" :aspect-ratio="1" position="solo" @click="" />
    </template>

    <template v-slot:title>
      <span> PETDENTITY</span>
    </template>

    <v-spacer />

    <v-btn icon="mdi-account" size="large" id="menu-account" />
    <v-menu activator="#menu-account">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title @click="item.handler">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import Logo from '@/components/common/Logo.vue'
import Button from '@/components/common/Button.vue'
import { signOut } from '@/api/session.js'

import { useRouter } from 'vue-router'
const router = useRouter()

const items = [
  {
    title: 'Profile',
    handler: async () => {
      router.push({ name: 'UserProfile' })
    }
  },
  {
    title: 'Change Password',
    handler: async () => {
      router.push({ name: 'UserPassword' })
    }
  },
  {
    title: 'Logout',
    handler: async () => {
      await signOut()
      location.reload()
    }
  }
]

const clickHandler = () => {
  router.push({ name: 'UserDashboard' })
}
</script>

<style></style>
