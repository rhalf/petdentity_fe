<template>
  <Label>{{ format(display) }}</Label>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import { watchEffect } from "vue";

import { ref, toRefs } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const propsRef = toRefs(props);
const { value } = propsRef;

const display = ref(0);
let steps = 0;

let interval = null;

watchEffect(() => {
  const current = value.value;
  if (current <= display.value) return;

  steps = parseInt(current / 100) | 1;

  interval = setInterval(() => {
    display.value += steps;

    if (current <= display.value) {
      clearInterval(interval);
      display.value = current;
    }
  }, 50);
});

const format = (number) => {
  return number.toLocaleString("en-US");
};
</script>
