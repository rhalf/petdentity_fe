<template>
  <v-text-field persistent-placeholder hide-details="auto" v-bind="properties" />
</template>

<script setup>
import { computed, onMounted } from 'vue'

const properties = {
  density: 'comfortable',
  persistentPlaceholder: true,
  hideDetails: 'auto'
}

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
