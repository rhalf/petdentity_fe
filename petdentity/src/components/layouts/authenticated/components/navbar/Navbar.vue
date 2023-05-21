<template>
  <v-app-bar :elevation="2" color="primary">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title> Petdentity </v-app-bar-title>

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
import { signOut } from '@/api/session.js'
const items = [
  { title: 'Profile' },
  { title: 'Change Password' },
  {
    title: 'Logout',
    handler: () => {
      signOut()
      location.reload()
    }
  }
]
</script>

<style></style>
