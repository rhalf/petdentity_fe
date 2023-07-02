<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Headline </Label>

      <TextArea class="mt-2" v-model="headline" placeholder="Tell something!" />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextArea from "@/components/common/TextArea.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:modelValue", "upload"]);
const props = defineProps({
  modelValue: String,
});

const propsRef = toRefs(props);

const headline = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
