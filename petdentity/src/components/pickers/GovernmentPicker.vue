<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="items"
    placeholder="Government"
    :loading="isLoading"
    item-title="name"
    item-value="id"
    uppercase
    @click:clear="params.searchText = ''"
  />
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";

import { get, search } from "@/api/government";

import { computed, toRefs, ref, watchEffect } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
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

    if (item.value) {
      const government = await get(item.value);
      if (government) params.value.searchText = government.name;
    }

    items.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

// onMounted(async () => {
//   await loadItems();
// });

// const load = debounce(() => {
//   if (!params.value.searchText) return;
//   loadItems();
// }, 500);

// watch(
//   params,
//   () => {
//     load();
//   },
//   { immediate: true, deep: true }
// );

watchEffect(() => {
  loadItems();
});
</script>

<style></style>
