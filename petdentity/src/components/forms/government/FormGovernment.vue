<template>
  <div>
    <Label class="text-primary"> Name </Label>
    <TextField
      class="mt-2"
      v-model="government.name"
      placeholder="Name"
      :disabled="disabled"
    />

    <v-row dense class="mt-2">
      <v-col cols="6">
        <Label class="text-primary"> Level </Label>
        <GovernmentLevel
          class="mt-2"
          v-model="government.level"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="6">
        <Label class="text-primary"> Privacy </Label>
        <Privacy
          class="mt-2"
          v-model="government.privacy"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <Label class="mt-4 pa-2 bg-primary" header> Address </Label>
    <FormAddress
      class="mt-2"
      v-model="government.address"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import GovernmentLevel from "@/components/pickers/GovernmentLevel.vue";
import Privacy from "@/components/pickers/Privacy.vue";

import FormAddress from "@/components/forms/address/FormAddress.vue";

// import Date from "@/components/pickers/Date.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;

const government = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
