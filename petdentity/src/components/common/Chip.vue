<template>
  <v-chip v-bind="properties">
    <slot />
  </v-chip>
</template>

<script setup>
const properties = {
  variant: "outlined",
};
</script>

<style scoped></style>
