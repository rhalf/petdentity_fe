<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Name </Label>
      <TextField
        class="mt-2"
        v-model="contact.name"
        placeholder="Name"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Mobile </Label>
      <Mobile
        class="mt-2"
        v-model="contact.mobileNumber"
        placeholder="Mobile"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col>
      <Label class="text-primary" bg-color="primary"> Address </Label>
    </v-col>
  </v-row>

  <v-row dense>
    <v-col>
      <FormAddress v-model="contact.address" :disabled="disabled" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Mobile from "@/components/common/Mobile.vue";
import TextField from "@/components/common/TextField.vue";
import FormAddress from "@/components/forms/address/FormAddress.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);

const contact = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
