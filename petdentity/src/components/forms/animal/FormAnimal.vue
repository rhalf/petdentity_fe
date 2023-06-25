<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Name </Label>
      <TextField class="mt-3" v-model="animal.name" />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Type </Label>
      <AnimalType class="mt-3" v-model="animal.type" />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="12">
      <Label class="text-primary"> Breeds </Label>
      <FormBreeds class="mt-3" v-model="animal.breeds" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import AnimalType from "@/components/pickers/AnimalType.vue";

import FormBreeds from "@/components/forms/breed/FormBreeds.vue";

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
