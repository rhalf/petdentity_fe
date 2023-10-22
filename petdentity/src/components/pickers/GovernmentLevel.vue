<template>
  <Select v-model="type" :items="items" v-bind="properties" />
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import { computed, toRefs, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const properties = {
  placeholder: "Government Level",
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
});
const propsRef = toRefs(props);

const items = ["Regional", "Provincial", "City", "Municipal", "Barangay"];

const type = computed(useModel(propsRef, emit, "modelValue"));

onMounted(() => {
  if (!type.value) type.value = items[2];
});
</script>

<style></style>
