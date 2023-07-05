<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Uid </Label>
      <TextField
        class="mt-3"
        v-model="unit.uid"
        placeholder="Uid"
        :disabled="disabled || isDisabled('uid')"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Unit Type </Label>
      <UnitType
        class="mt-3"
        v-model="unit.unitType"
        :disabled="disabled || isDisabled('unitType')"
      />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Form Type </Label>
      <UnitFormType
        class="mt-3"
        v-model="unit.formType"
        :disabled="disabled || isDisabled('formType')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="6">
      <Label class="text-primary"> AttachedTo </Label>
      <TextField
        class="mt-3"
        v-model="unit.AttachedTo"
        placeholder="AttachedTo"
        :disabled="disabled || isDisabled('attachedTo')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Status </Label>
      <StatusType
        class="mt-3"
        v-model="unit.status"
        placeholder="Status"
        :disabled="disabled || isDisabled('status')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-3">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Owner </Label>
      <TextField
        class="mt-3"
        v-model="unit.owner"
        placeholder="Owner"
        :disabled="disabled || isDisabled('owner')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Government </Label>
      <TextField
        class="mt-3"
        v-model="unit.government"
        placeholder="Government"
        :disabled="disabled || isDisabled('government')"
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

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
  disabledOption: {
    type: Array,
    default: [],
  },
});

const propsRef = toRefs(props);

const unit = computed(useModel(propsRef, emit, "modelValue"));

const isDisabled = (prop) => {
  const { disabledOption } = propsRef;
  return disabledOption.value?.includes(prop);
};
</script>

<style></style>
