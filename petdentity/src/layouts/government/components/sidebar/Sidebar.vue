<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    width="300"
    v-if="government"
  >
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

import { ref, toRefs, computed, watch, inject } from "vue";
import { useModel } from "@/utils/vue";

const itemsRef = ref(items);

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue"]);
const propsRef = toRefs(props);
const drawer = computed(useModel(propsRef, emit, "modelValue"));

const government = inject("government");
watch(government, (current) => {
  itemsRef.value = items.map((item) => {
    item.to.params = { governmentId: current.id };
    return item;
  });
});
</script>
