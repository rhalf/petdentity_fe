<template>
  <Select v-model="type" :items="items" v-bind="properties" />
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import { computed, toRefs } from "vue";
import { useModel } from "@/utils/vue";

const properties = {
  placeholder: "Animal Type",
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const items = ["Amphibian", "Bird", "Fish", "Mammal", "Reptile"];

const type = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
