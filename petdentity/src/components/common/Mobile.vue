<template>
  <v-text-field v-bind="properties" :rules="[rules.counter]" />
</template>

<script setup>
import { ref } from "vue";

const properties = {
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  prependInnerIcon: "mdi-phone",
};

const rules = ref({
  counter: (value) =>
    value?.length === 11 || "Mobile number should be 11 digits",
});
</script>

<style scoped></style>
