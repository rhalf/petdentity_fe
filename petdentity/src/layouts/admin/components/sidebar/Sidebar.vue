<template>
  <v-navigation-drawer v-model="drawer" location="left" width="320">
    <v-list
      :items="itemsRef"
      lines="two"
      item-props
      item-title="title"
      item-value="to"
      color="primary"
      density="compact"
    >
      <template v-slot:prepend="{ item }">
        <v-icon>{{ item.icon }}</v-icon>
      </template>
      <template v-slot:title="{ item }">
        <Label medium>{{ item.title }}</Label>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import { items } from "./data";

import { useModel } from "@/utils/vue";
import { ref, toRefs, computed } from "vue";

const itemsRef = ref(items);

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue"]);
const propsRef = toRefs(props);
const drawer = computed(useModel(propsRef, emit, "modelValue"));
</script>
