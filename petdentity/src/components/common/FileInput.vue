<template>
  <v-file-input v-bind="properties" />
</template>

<script setup>
const properties = {
  //default
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  label: "File input",
};
</script>
