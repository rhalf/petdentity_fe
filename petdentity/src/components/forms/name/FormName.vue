<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="">
        <Label class="text-primary"> Prefix </Label>

        <TextField class="mt-2" v-model="name.prefix" />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4">
        <Label class="text-primary"> First </Label>
        <TextField class="mt-2" v-model="name.first" />
      </v-col>

      <v-col cols="12" md="4">
        <Label class="text-primary"> Middle </Label>
        <TextField class="mt-2" v-model="name.middle" />
      </v-col>

      <v-col cols="12" md="4">
        <Label class="text-primary"> Last </Label>

        <TextField class="mt-2" v-model="name.last" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="">
        <Label class="text-primary"> Suffix </Label>

        <TextField class="mt-2" v-model="name.suffix" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);

const name = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
