<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Gender </Label>
      <Gender class="mt-2" v-model="gender" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Gender from "@/components/pickers/Gender.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: String,
});

const propsRef = toRefs(props);

const gender = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
