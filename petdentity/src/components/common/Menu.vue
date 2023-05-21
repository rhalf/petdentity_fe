<template>
  <v-menu :activator="activator">
    <v-list>
      <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { baseProps, inputProps } from '@/mixins/props'

const props = defineProps({ ...baseProps, activator: { default: undefined } })
const emit = defineEmits(['click'])

const menuItems = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' }
]

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
