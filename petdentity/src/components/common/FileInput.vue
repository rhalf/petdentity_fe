<template>
  <v-file-input @click="emit('click')" v-bind="properties">
    <slot />
  </v-file-input>
</template>

<script setup>
const emit = defineEmits(['click'])

const properties = {
  //default
  density: 'comfortable',
  persistentPlaceholder: true,
  hideDetails: 'auto',
  class: 'text-primary',
  label: 'File input'
}
</script>
