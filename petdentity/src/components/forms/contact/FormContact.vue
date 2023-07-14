<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Name </Label>
      <FormAddress class="mt-2" v-model="contact.name" />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Mobile </Label>
      <TextField class="mt-2" v-model="contact.number" />
    </v-col>

    <v-col cols="12">
      <Label class="text-primary"> Gender </Label>
      <FormAddress class="mt-2" v-model="contact.address" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";
import Mobile from "@/components/common/Mobile.vue";
import FormAddress from "@/components/forms/FormAddress.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Boolean,
});

const propsRef = toRefs(props);

const contact = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
