<template>
  <v-alert v-bind="properties">
    <slot></slot>
  </v-alert>
</template>

<script setup>
const properties = {
  color: "blue",
  variant: "outlined",
};
</script>
