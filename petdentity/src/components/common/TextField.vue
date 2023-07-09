<template>
  <v-text-field
    v-model="item"
    :type="type"
    v-bind="properties"
    @blur="blurHandler"
  />
</template>

<script setup>
import { useModel } from "@/utils/vue";
import { toRefs } from "vue";
import { computed } from "vue";

const properties = {
  density: "comfortable",
  persistentPlaceholder: true,
  hideDetails: "auto",
  clearable: true,
};

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: { type: [String, Number] },
  type: "String",
  withDecimal: Boolean,
});

const propsRef = toRefs(props);
const item = computed(useModel(propsRef, emit, "modelValue"));
const { type, withDecimal } = propsRef;

const blurHandler = () => {
  if (type.value === "number" && withDecimal.value) {
    item.value = Number.parseFloat(item.value).toFixed(2);
  }
};
</script>

<style scoped></style>
