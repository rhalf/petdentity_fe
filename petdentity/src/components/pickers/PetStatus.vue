<template>
  <Select v-model="type" :items="items" v-bind="properties" />
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import { computed, toRefs, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const properties = {
  placeholder: "PetStatus",
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

import { PetStatuses } from "@/constants";

const items = Object.keys(PetStatuses);

const type = computed(useModel(propsRef, emit, "modelValue"));

onMounted(() => {
  if (!type.value) type.value = items[0];
});
</script>

<style></style>
