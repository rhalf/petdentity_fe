<template>
  <v-sheet v-bind="properties">
    <slot></slot>
  </v-sheet>
</template>

<script setup>
const properties = {
  class: "pa-4 rounded",
};
</script>
