<template>
  <div>
    <Label class="text-primary"> Name </Label>
    <TextField
      class="mt-2"
      v-model="vaccine.name"
      placeholder="Name"
      :disabled="disabled"
    />

    <v-row dense class="mt-2">
      <v-col md="6">
        <Label class="text-primary"> Serial Number </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.serialNumber"
          placeholder="Serial Number"
          :disabled="disabled"
        />
      </v-col>
      <v-col md="6">
        <Label class="text-primary"> Lot Number </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.lotNumber"
          placeholder="Lot Number"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" md="6">
        <Label class="text-primary"> Date of Application</Label>
        <Date
          class="mt-2"
          v-model="vaccine.applicationDate"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="12" md="6">
        <Label class="text-primary"> Date of Validity</Label>
        <Date
          class="mt-2"
          v-model="vaccine.validityDate"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col md="6">
        <Label class="text-primary"> Date of Booster </Label>
        <Date class="mt-2" v-model="vaccine.boosterDate" :disabled="disabled" />
      </v-col>
      <v-col md="6">
        <Label class="text-primary"> Remarks </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.remarks"
          placeholder="Remarks"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col md="12">
        <Label class="text-primary"> Veterinarian </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.veterination"
          placeholder="Veterinarian"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col md="6">
        <Label class="text-primary"> PRC Number </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.prcNumber"
          placeholder="Veterinarian"
          :disabled="disabled"
        />
      </v-col>
      <v-col md="6">
        <Label class="text-primary"> PTC Number </Label>
        <TextField
          class="mt-2"
          v-model="vaccine.ptcNumber"
          placeholder="PTC Number"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import Date from "@/components/pickers/Date.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;
const vaccine = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
