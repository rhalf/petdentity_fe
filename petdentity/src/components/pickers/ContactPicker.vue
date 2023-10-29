<template>
  <v-combobox
    class="primary"
    base-color="primary"
    v-model="item"
    :items="items"
    placeholder="Contacts"
    :loading="isLoading"
    item-title="name"
    item-value="name"
    density="compact"
  />
</template>

<script setup>
import { all } from "@/api/owner/contacts";

import { computed, toRefs, ref, watchEffect, inject } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref();

const user = inject("user");

const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await all(user.value, params.value);
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
