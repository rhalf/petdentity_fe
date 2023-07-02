<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Date </Label>

      <Date class="mt-2" v-model="date" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Date from "@/components/pickers/Date.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: String,
});

const propsRef = toRefs(props);

const date = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
