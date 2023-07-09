<template>
  <v-color-picker
    v-model="item"
    mode="hexa"
    :modes="['hexa']"
    show-swatches
    :width="300"
    dot-size="20"
    :swatches-max-height="240"
  />
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "#FFFFFFFF",
  },
});
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
