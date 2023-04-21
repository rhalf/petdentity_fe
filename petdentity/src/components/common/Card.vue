<template>
  <v-card
    :class="classes"
    :elevation="elevation"
    :ripple="ripple"
    :max-width="maxWidth"
    :min-width="minWidth"
    :width="width"
    :height="height"
    :color="color"
    :outlined="outlined"
  >
    <slot />
  </v-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { baseProps } from '@/mixins/props'

defineProps(baseProps)

onMounted(() => {})
</script>
