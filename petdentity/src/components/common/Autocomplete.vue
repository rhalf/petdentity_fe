<template>
  <v-autocomplete v-bind="properties">
    <slot />
  </v-autocomplete>
</template>

<script setup>
const properties = {
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  clearable: true,
};
</script>

<style scoped></style>
