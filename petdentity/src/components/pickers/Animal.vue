<template>
  <Select
    v-model="item"
    :items="items"
    placeholder="Animal"
    :loading="isLoading"
    item-title="name"
    item-value="name"
    return-object
    customized
  />
</template>

<script setup>
import Select from "@/components/common/Select.vue";

import { getAll } from "@/api/animal";

import { computed, toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);
const items = ref([]);

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await getAll();
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
