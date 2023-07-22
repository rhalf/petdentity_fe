<template>
  <v-text-field v-bind="properties" />
</template>

<script setup>
import { ref } from "vue";

const properties = {
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  prependInnerIcon: "mdi-phone",
  type: "number",
  counter: true,
};

const rules = ref({
  counter: (value) => {
    if (!value) return true;

    return value.length <= 11 || "Mobile number should be 11 digits";
  },
});
</script>

<style scoped></style>
