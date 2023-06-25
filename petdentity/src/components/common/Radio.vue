<template>
  <v-radio @click="emit('click')" v-bind="properties">
    <slot></slot>
  </v-radio>
</template>

<script setup>
const emit = defineEmits(["click"]);

const properties = {};
</script>
