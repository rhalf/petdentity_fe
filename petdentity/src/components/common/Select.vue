<template>
  <v-select v-bind="properties">
    <slot />
  </v-select>
</template>

<script setup>
const properties = {
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  clearable: true,
};

const props = defineProps({
  customized: Boolean,
});
</script>

<style scoped></style>
