<template>
  <v-tabs v-bind="properties"><slot /></v-tabs>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const properties = {
  class: 'text-h4  py-1'
}

onMounted(() => {
  // console.log(props)
})
</script>

<style scoped></style>
