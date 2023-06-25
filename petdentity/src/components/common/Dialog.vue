<template>
  <v-dialog @click="emit('click')" v-bind="properties">
    <slot></slot>
  </v-dialog>
</template>

<script setup>
const emit = defineEmits(["click"]);

const properties = {
  class: "text-primary",
  persistent: true,
};
</script>
