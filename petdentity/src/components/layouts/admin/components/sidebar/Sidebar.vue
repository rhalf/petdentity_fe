<template>
  <v-navigation-drawer v-model="drawer" location="left">
    <!-- v-model:selected="selected" -->
    <v-list
      :items="itemsRef"
      lines="two"
      item-props
      item-title="title"
      item-value="to"
      color="primary"
    >
      <template v-slot:prepend="{ item }">
        <v-icon>{{ item.icon }}</v-icon>
      </template>
      <template v-slot:title="{ item }">
        <Label bold>{{ item.title }}</Label>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import { items } from "./data";

import { useModel } from "@/utils/vue";
import { ref, toRefs, computed, watch } from "vue";

const itemsRef = ref(items);

const selected = ref();
watch(selected, (current) => {
  console.log(current);
});

const clickHandler = (item) => {
  console.log(item);
};

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue"]);
const propsRef = toRefs(props);
const drawer = computed(useModel(propsRef, emit, "modelValue"));
</script>
