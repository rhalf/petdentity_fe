<template>
  <Select
    v-model="item"
    :items="items"
    placeholder="Breed"
    :loading="isLoading"
    item-title="name"
    item-value="name"
    customized
  />
</template>

<script setup>
import Select from "@/components/common/Select.vue";

import { getAll } from "@/api/breed";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String, animal: Object });
const propsRef = toRefs(props);

const { animal } = propsRef;

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref([]);

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await getAll(animal.value.id);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItems();
});

watch(
  animal,
  (current, previous) => {
    if (current !== previous) loadItems();
  },
  { immediate: true, deep: true }
);
</script>

<style></style>
