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
import { getAll } from "@/api/contact";

import { computed, toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref();

const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
  limitNumber: null,
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await getAll(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItems();
});
</script>

<style></style>
