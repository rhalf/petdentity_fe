<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Name </Label>
      <TextField
        class="mt-3"
        v-model="animal.name"
        placeholder="Name"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Type </Label>
      <AnimalType class="mt-3" v-model="animal.type" :disabled="disabled" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import AnimalType from "@/components/pickers/AnimalType.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;
const animal = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
