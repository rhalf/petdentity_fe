<template>
  <v-form v-model="form" validate-on="input">
    <v-row dense>
      <v-col>
        <Label class="text-primary"> Name </Label>
        <TextField
          class="mt-2"
          v-model="government.name"
          placeholder="Name"
          :disabled="disabled"
          uppercase
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col>
        <Label class="text-primary"> Description </Label>
        <TextField
          class="mt-2"
          v-model="government.description"
          placeholder="Description"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="6">
        <Label class="text-primary"> Email </Label>
        <TextField
          class="mt-2"
          v-model="government.email"
          :disabled="disabled"
          :rules="[validation.email]"
          type="email"
          prepend-inner-icon="mdi-email"
        />
      </v-col>
      <v-col cols="6">
        <Label class="text-primary"> Mobile </Label>
        <Mobile class="mt-2" v-model="government.mobile" :disabled="disabled" />
      </v-col>
    </v-row>

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

    <v-row dense class="mt-2">
      <v-col>
        <Label class="mt-4 pa-2 bg-primary" text> Address </Label>
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col>
        <FormAddress
          class="mt-2"
          v-model="government.address"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";
import Mobile from "@/components/common/Mobile.vue";

import GovernmentLevel from "@/components/pickers/GovernmentLevel.vue";
import Privacy from "@/components/pickers/Privacy.vue";

import FormAddress from "@/components/forms/address/FormAddress.vue";

import validation from "@/utils/validation";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload", "update:form"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
  form: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;

const government = computed(useModel(propsRef, emit, "modelValue"));
const form = computed(useModel(propsRef, emit, "form"));
</script>

<style></style>
