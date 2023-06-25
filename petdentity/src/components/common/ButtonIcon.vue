<template>
  <v-btn @click="emit('click')" v-bind="properties" />
</template>

<script setup>
const emit = defineEmits(["click"]);

const properties = {
  //default
  variant: "plain",
  size: "x-small",
};
</script>
