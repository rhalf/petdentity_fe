<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="items"
    placeholder="Animal"
    :loading="isLoading"
    item-title="name"
    item-value="name"
    return-object
    uppercase
  />
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { search } from "@/api/animal";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";
import { watchEffect } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(async () => {
  await loadItems();
});
</script>

<style></style>
