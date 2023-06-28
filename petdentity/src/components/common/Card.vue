<template>
  <v-card v-bind="properties">
    <slot />
  </v-card>
</template>

<script setup>
const properties = {
  maxWidth: 1280,
};
</script>
