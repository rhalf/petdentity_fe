<template>
  <v-row v-if="user">
    <v-col cols="12" md="4">
      <Panel2 v-model="user" />
    </v-col>
    <v-col cols="12" md="8">
      <Panel1 v-model="user.profile" />
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
const user = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
