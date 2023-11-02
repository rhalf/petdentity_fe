<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="items"
    placeholder="Email"
    :loading="isLoading"
    item-title="email"
    item-value="id"
    @click:clear="params.searchText = ''"
  >
  </Autocomplete>
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";

import { get, search } from "@/api/users";

import { computed, toRefs, ref, watchEffect, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref();

const params = ref({
  searchText: "",
  columnName: "email",
  orderDirection: "asc",
  limitNumber: 5,
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    if (item.value) {
      const user = await get(item.value);
      if (user) params.value.searchText = user.email;
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

watchEffect((item) => {
  loadItems();
});
</script>

<style></style>
