<template>
  <v-sheet
    :class="classes"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :min-width="minWidth"
    :min-height="minHeight"
    :width="width"
    :height="height"
    :outlined="outlined"
    :color="color"
    fill
  >
    <slot></slot>
  </v-sheet>
</template>

<script setup>
import { onMounted } from 'vue'
import { baseProps } from '@/mixins/props'

defineProps(baseProps)

onMounted(() => {})
</script>

<style></style>
