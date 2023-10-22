<template>
  <Card>
    <v-row dense class="pa-4 bg-primary">
      <v-col cols="auto" align="left" justify="center">
        <v-icon class="text-h2">{{ counter.icon }}</v-icon>
      </v-col>
      <v-col cols="" align="right" justify="center">
        <Number title medium :value="counter.count" />
        <Label text medium>{{ counter.title }}</Label>
      </v-col>
    </v-row>
  </Card>
</template>

<script setup>
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import Number from "@/components/common/Number.vue";

import { padStart } from "lodash";

import { computed, toRefs } from "vue";
import { useModel } from "@/utils/vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const counter = computed(useModel(propsRef, emits, "modelValue"));

const pad = (value) => {
  return padStart(value, 7, "0");
};
</script>
