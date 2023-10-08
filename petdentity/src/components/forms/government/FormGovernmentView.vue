<template>
  <v-row v-if="government">
    <v-col>
      <Panel1 v-model="government" />
    </v-col>
  </v-row>

  <v-row v-if="government">
    <v-col>
      <Panel2 v-model="government" />
    </v-col>
  </v-row>
</template>

<script setup>
import Panel1 from "./components/Panel1.vue";
import Panel2 from "./components/Panel2.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const government = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
