<template>
  <v-container>
    <v-row class="pa-16">
      <v-col cols="12" sm="6" md="4" v-for="(item, index) in items" :key="index">
        <v-btn
          color="primary"
          class="pa-5"
          :height="item.height"
          block
          :disabled="item.disabled"
          :to="item.to"
        >
          <template v-slot:default>
            <v-row dense>
              <v-col class="text-center">
                <div>
                  <v-icon class="text-h1" size="x-large">{{ item.icon }}</v-icon>
                </div>
                <div class="text-title mt-2">{{ item.title }}</div>
                <div class="mt-2">
                  <v-chip color="white" v-if="!item.visible">Coming Soon!</v-chip>
                </div>
              </v-col>
            </v-row>
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Button from '@/components/common/Button.vue'

import { USER_ROLES } from '@/data/structure'
const { PET_OWNER, VETERINARIAN, SYSTEM_ADMIN, LOCAL_GOVERNMENT } = USER_ROLES

import { useUserStore } from '@/stores/user'
const user = useUserStore()

import { dashboardItems } from './data'

import { computed } from 'vue'

const items = computed(() => {
  return dashboardItems.map((item) => {
    item.disabled = true

    user.getRoles?.forEach((role) => {
      const state = item.roles.includes(role)
      if (state) item.disabled = false || !item.visible
    })

    return item
  })
})
</script>
