<template>
  <Select
    v-model="item"
    :items="petColor"
    placeholder="Pet Color"
    :loading="isLoading"
    return-object
    item-title="name"
  >
  </Select>
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import Label from "@/components/common/Label.vue";
import Card from "@/components/common/Card.vue";

import { getAll } from "@/api/color";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object, animal: Object });
const propsRef = toRefs(props);

const { animal } = propsRef;

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const petColor = ref();

const loadItems = async () => {
  try {
    isLoading.value = true;

    if (!animal.value) return;

    const items = await getAll(animal.value.id);

    if (items.length) petColor.value = items;
    else petColor.value = [];
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
