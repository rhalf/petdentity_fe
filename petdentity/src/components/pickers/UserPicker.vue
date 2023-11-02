<template>
  <Autocomplete
    v-model="item"
    :items="items"
    v-model:search="params.searchText"
    placeholder="Email"
    :loading="isLoading"
    item-title="email"
    item-value="email"
    return-object
    @click:clear="loadItems"
  >
  </Autocomplete>
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";

import { search } from "@/api/users";

import { computed, toRefs, ref, watch, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref();

const params = ref({
  searchText: null,
  columnName: "email",
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

onMounted(async () => {
  await loadItems();
});

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
</script>

<style></style>
