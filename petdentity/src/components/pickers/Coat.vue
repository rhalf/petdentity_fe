<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="coat"
    placeholder="Coat / Color"
    :loading="isLoading"
    item-title="name"
    item-value="name"
  >
  </Autocomplete>
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";
import { getAll, search } from "@/api/coat";

import { computed, toRefs, ref, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String, animal: Object });
const propsRef = toRefs(props);

const { animal } = propsRef;

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const coat = ref();

const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    // const items = await getAll();
    const items = await search(params.value);

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

const load = debounce(() => {
  loadItems();
}, 1000);

watch(
  params,
  () => {
    load();
  },
  { immediate: true, deep: true }
);
</script>

<style></style>
