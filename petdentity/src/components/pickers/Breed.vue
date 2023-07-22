<template>
  <Select
    v-model="item"
    :items="breeds"
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
const breeds = ref();

const loadItems = async () => {
  try {
    isLoading.value = true;

    if (!animal.value) return;

    const items = await getAll(animal.value.id);

    if (items.length) breeds.value = items;
    else breeds.value = [];

    breeds.value = items;
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
