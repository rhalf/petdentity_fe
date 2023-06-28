<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Uid </Label>
      <TextField class="mt-3" v-model="unit.uid" placeholder="Uid" />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Type </Label>
      <CommType class="mt-3" v-model="unit.commType" />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Type </Label>
      <UnitType class="mt-3" v-model="unit.type" />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="12">
      <Label class="text-primary"> Breeds </Label>
      <FormBreeds class="mt-3" v-model="unit.breeds" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import UnitType from "@/components/pickers/UnitType.vue";
import CommType from "@/components/pickers/CommType.vue";

import FormBreeds from "@/components/forms/breed/FormBreeds.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const unit = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
