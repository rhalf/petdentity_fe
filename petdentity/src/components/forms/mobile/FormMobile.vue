<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Mobile </Label>

      <Mobile class="mt-2" v-model="mobile" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Mobile from "@/components/common/Mobile.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
});

const propsRef = toRefs(props);

const mobile = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
