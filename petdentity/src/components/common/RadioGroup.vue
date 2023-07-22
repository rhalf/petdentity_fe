<template>
  <v-radio-group v-bind="properties" v-model="model">
    <slot></slot>
  </v-radio-group>
</template>

<script setup>
const properties = {
  //default
  variant: "elevated",
  color: "primary",
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
};

import { toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);
const model = computed(useModel(propsRef, emit, "modelValue"));
</script>
