<template>
  <Select v-model="type" :items="items" v-bind="properties" />
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import { computed, toRefs, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const properties = {
  placeholder: "Unit Form Type",
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const items = ["Microchip", "Tag", "Ring", "Card", "Wristband", "Neclace"];

const type = computed(useModel(propsRef, emit, "modelValue"));

onMounted(() => {
  if (!type.value) type.value = items[0];
});
</script>

<style></style>
