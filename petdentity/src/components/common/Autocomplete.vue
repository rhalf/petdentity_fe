<template>
  <v-autocomplete
    v-model="item"
    v-model:search="itemSearch"
    density="comfortable"
    hideDetails="auto"
    :persistentPlaceholder="true"
    :clearable="true"
    :rules="rules"
    @update:search="updateModelHandler"
  >
    <slot />
  </v-autocomplete>
</template>

<script setup>
import validation from "@/utils/validation";
import { useModel } from "@/utils/vue";
import { toRefs, ref, computed, onMounted } from "vue";

const emit = defineEmits(["update:modelValue", "update:search"]);
const props = defineProps({
  modelValue: { type: [String, Number, Object] },
  search: String,
  required: Boolean,
  uppercase: Boolean,
  lowercase: Boolean,
});

const propsRef = toRefs(props);
const item = computed(useModel(propsRef, emit, "modelValue"));
const itemSearch = computed(useModel(propsRef, emit, "search"));

const { required, uppercase, lowercase } = propsRef;

const rules = ref([]);

onMounted(() => {
  if (required.value) rules.value.push(validation.required);
});

const updateModelHandler = (event) => {
  if (!event) return;
  let value = String(event);
  if (uppercase.value) itemSearch.value = value.toUpperCase();
  if (lowercase.value) itemSearch.value = value.toLowerCase();
};
</script>

<style scoped></style>
