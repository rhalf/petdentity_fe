<template>
  <v-text-field v-bind="properties" />
</template>

<script setup>
import { computed, onMounted } from 'vue'

const properties = {
  density: 'comfortable',
  persistentPlaceholder: true,
  hideDetails: 'auto'
  // class: 'text-primary'
}

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
