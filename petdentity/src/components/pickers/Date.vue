<template>
  <TextField v-model="time" v-bind="properties" />
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import { useModel } from "@/utils/vue";
import { toRefs } from "vue";
import { computed } from "vue";

const properties = {
  density: "comfortable",
  type: "date",
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });

const propsRef = toRefs(props);
const time = computed(useModel(propsRef, emit, "modelValue"));
</script>
