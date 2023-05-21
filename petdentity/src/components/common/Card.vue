<template>
  <v-card v-bind="properties">
    <slot />
  </v-card>
</template>

<script setup>
const properties = {
  class: 'ma-3',
  maxWidth: 1280
}
</script>
