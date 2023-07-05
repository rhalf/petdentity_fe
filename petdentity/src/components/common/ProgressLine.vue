<template>
  <v-progress-linear v-bind="properties" />
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['click'])

onMounted(() => {
  // console.log(props)
})

const properties = {
  absolute: true,
  color: 'primary'
}
</script>
