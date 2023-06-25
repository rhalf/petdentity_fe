<template>
  <v-radio-group @click="emit('click')" v-bind="properties" v-model="model">
    <slot></slot>
  </v-radio-group>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["click", "update:modelValue"]);
const props = defineProps({ modelValue: Boolean });

const properties = {
  //default
  variant: "elevated",
  color: "primary",
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
};

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
