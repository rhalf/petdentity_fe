<template>
  <span v-bind="properties"><slot /></span>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const properties = {
  class: 'text-body-1 py-1'
}

onMounted(() => {
  // console.log(props)
})
</script>
