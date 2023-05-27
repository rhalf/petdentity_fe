<template>
  <v-label v-bind="properties"><slot /></v-label>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const properties = {
  class: 'text-h4 text-primary py-1'
}

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
