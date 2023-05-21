<template>
  <v-btn @click="emit('click')" v-bind="properties">
    <slot></slot>
  </v-btn>
</template>

<script setup>
const emit = defineEmits(['click'])

const properties = {
  variant: 'elevated',
  block: true,
  color: 'primary'
}
</script>
