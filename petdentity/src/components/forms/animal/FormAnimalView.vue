<template>
  <v-row dense>
    <v-col>
      <Label header class="text-primary">
        {{ animal.name }}
      </Label>
    </v-col>
    <v-col class="text-right">
      <Label header class="text-grey"> {{ animal.type }} </Label>
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const animal = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
