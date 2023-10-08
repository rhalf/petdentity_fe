<template>
  <v-text-field
    v-model="item"
    :type="type"
    @blur="blurHandler"
    :rules="rules"
    density="comfortable"
    :persistentPlaceholder="true"
    hideDetails="auto"
    :clearable="true"
  />
</template>

<script setup>
import validation from "@/utils/validation";
import { useModel } from "@/utils/vue";
import { toRefs, ref, computed, onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: [String, Number] },
  type: {
    type: String,
    default: undefined,
  },
  withDecimal: Boolean,
  required: Boolean,
});

const propsRef = toRefs(props);
const item = computed(useModel(propsRef, emit, "modelValue"));
const { type, withDecimal, required } = propsRef;

const blurHandler = () => {
  if (type.value === "number" && withDecimal.value) {
    item.value = Number.parseFloat(item.value).toFixed(2);
  }
};

const rules = ref([]);

onMounted(() => {
  if (required.value) rules.value.push(validation.required);
});
</script>

<style scoped></style>
