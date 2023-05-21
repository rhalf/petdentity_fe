<template>
  <span @click="emit('click')" v-bind="props">
    <slot></slot>
  </span>
</template>

<script setup>
const emit = defineEmits(['click'])

const props = {
  class: 'text-primary'
}
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>
