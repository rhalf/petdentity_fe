<template>
  <v-toolbar @click="emit('click')" v-bind="properties">
    <slot></slot>
  </v-toolbar>
</template>

<script setup>
const emit = defineEmits(["click"]);

const properties = {
  class: "text-primary",
};
</script>
