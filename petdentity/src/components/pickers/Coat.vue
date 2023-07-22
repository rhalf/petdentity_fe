<template>
  <Select
    v-model="item"
    :items="coat"
    placeholder="Coat"
    :loading="isLoading"
    item-title="name"
    item-value="name"
  >
  </Select>
</template>

<script setup>
import Select from "@/components/common/Select.vue";

import { getAll } from "@/api/coat";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String, animal: Object });
const propsRef = toRefs(props);

const { animal } = propsRef;

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const coat = ref();

const loadItems = async () => {
  try {
    isLoading.value = true;

    const items = await getAll();

    if (items.length) coat.value = items;
    else coat.value = [];
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watch(
  animal,
  () => {
    loadItems();
  },
  { immediate: true, deep: true }
);
</script>

<style></style>
