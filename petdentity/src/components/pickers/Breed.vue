<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="breeds"
    placeholder="Breed"
    :loading="isLoading"
    item-title="name"
    item-value="name"
    @update:search="updateSearchHandler"
  />
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";

import { getAll, search } from "@/api/breed";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String, animal: Object });
const propsRef = toRefs(props);

const { animal } = propsRef;

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const breeds = ref();

const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    if (!animal.value) return;

    // const items = await getAll(animal.value.id);
    const items = await search(animal.value.id, params.value);

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

const load = debounce(() => {
  if (!params.value.searchText) return;
  loadItems();
}, 500);

watch(
  params,
  () => {
    load();
  },
  { immediate: true, deep: true }
);

const updateSearchHandler = () => {
  if (typeof params.value.searchText != "string") return;
  params.value.searchText = params.value.searchText.toUpperCase();
};
</script>

<style></style>
