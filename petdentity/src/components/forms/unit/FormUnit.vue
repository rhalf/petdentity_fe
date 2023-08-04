<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Uid </Label>
      <TextField
        class="mt-3"
        v-model="unit.uid"
        placeholder="Uid"
        counter
        :disabled="disabled || !isAllowed('uid')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="">
      <Label class="text-primary"> Unit Type </Label>
      <UnitType
        class="mt-3"
        v-model="unit.unitType"
        :disabled="disabled || !isAllowed('unitType')"
      />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Form Type </Label>
      <UnitFormType
        class="mt-3"
        v-model="unit.formType"
        :disabled="disabled || !isAllowed('formType')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Status </Label>
      <StatusType
        class="mt-3"
        v-model="unit.status"
        placeholder="Status"
        :disabled="disabled || !isAllowed('status')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Date of Application </Label>
      <Date
        class="mt-3"
        v-model="unit.applicationDate"
        placeholder="Date of Application"
        :disabled="disabled || !isAllowed('applicationDate')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Pet </Label>
      <TextField
        class="mt-3"
        v-model="unit.pet"
        placeholder="Pet"
        :disabled="disabled || !isAllowed('pet')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Owner </Label>
      <TextField
        class="mt-3"
        v-model="unit.owner"
        placeholder="Owner"
        :disabled="disabled || !isAllowed('owner')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Veterinarian </Label>
      <TextField
        class="mt-3"
        v-model="unit.veterinarian"
        placeholder="Veterinarian"
        :disabled="disabled || !isAllowed('veterinarian')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Government </Label>
      <TextField
        class="mt-3"
        v-model="unit.government"
        placeholder="Government"
        :disabled="disabled || !isAllowed('government')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import UnitFormType from "@/components/pickers/UnitFormType.vue";
import UnitType from "@/components/pickers/UnitType.vue";
import StatusType from "@/components/pickers/StatusType.vue";
import Date from "@/components/pickers/Date.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,

  option: {
    type: Array,
    default: [],
  },
});

const propsRef = toRefs(props);
const { disabled } = propsRef;

const unit = computed(useModel(propsRef, emit, "modelValue"));

const isAllowed = (prop) => {
  const { option } = propsRef;
  return option.value?.includes(prop);
};
</script>

<style></style>
