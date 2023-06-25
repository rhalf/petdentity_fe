<template>
  <v-btn @click="emit('click')" v-bind="properties">
    <slot />
  </v-btn>
</template>

<script setup>
const emit = defineEmits(["click"]);

const properties = {
  //default
  variant: "elevated",
  color: "primary",
};
</script>
